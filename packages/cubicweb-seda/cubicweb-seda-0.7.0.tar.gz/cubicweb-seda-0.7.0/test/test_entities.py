# copyright 2016-2017 LOGILAB S.A. (Paris, FRANCE), all rights reserved.
# contact http://www.logilab.fr -- mailto:contact@logilab.fr
#
# This program is free software: you can redistribute it and/or modify it under
# the terms of the GNU Lesser General Public License as published by the Free
# Software Foundation, either version 2.1 of the License, or (at your option)
# any later version.
#
# This program is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
# FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
# details.
#
# You should have received a copy of the GNU Lesser General Public License along
# with this program. If not, see <http://www.gnu.org/licenses/>.
"""cubicweb-seda unit tests for entities.container"""

import json
import unittest

from six import text_type

from logilab.common import attrdict

from cubicweb.devtools.testlib import CubicWebTC

from cubes.seda.entities import (seda_profile_container_def, simplified_profile, full_seda2_profile,
                                 parent_and_container, rule_type_from_etype)

from testutils import create_archive_unit, create_data_object


def sort_container(container_def):
    for k, v in container_def:
        yield k, sorted(v)


class ContainerTC(CubicWebTC):

    def test_seda_profile_container(self):
        # line below should be copied from entities.container.registration_callback
        container_def = seda_profile_container_def(self.schema)
        container_def = dict(sort_container(container_def))
        self.assertEqual(container_def['SEDAMimeType'],
                         [('seda_mime_type_from', 'subject')])
        self.assertNotIn('ConceptScheme', container_def)
        self.assertNotIn('Concept', container_def)
        self.assertNotIn('AuthorityRecord', container_def)
        entity = self.vreg['etypes'].etype_class('SEDAArchiveTransfer')(self)
        self.assertIsNotNone(entity.cw_adapt_to('IContainer'))
        self.assertIsNone(entity.cw_adapt_to('IContained'))

    def test_container_relation(self):
        with self.admin_access.client_cnx() as cnx:
            create = cnx.create_entity
            transfer = create('SEDAArchiveTransfer', title=u'test profile')
            mtclv = create('SEDAMimeTypeCodeListVersion',
                           seda_mime_type_code_list_version_from=transfer)
            access_rule = create('SEDAAccessRule', seda_access_rule=transfer)
            cnx.commit()
            for entity in (mtclv, access_rule):
                entity.cw_clear_all_caches()
                self.assertEqual(entity.cw_adapt_to('IContained').container.eid, transfer.eid)
            access_rule_seq = create('SEDASeqAccessRuleRule',
                                     reverse_seda_seq_access_rule_rule=access_rule)
            start_date = create('SEDAStartDate', seda_start_date=access_rule_seq)
            cnx.commit()
            for entity in (access_rule_seq, start_date):
                entity.cw_clear_all_caches()
                self.assertEqual(entity.cw_adapt_to('IContained').container.eid, transfer.eid)

    def test_archive_unit_container_clone(self):
        """Functional test for SEDA component clone."""
        with self.admin_access.repo_cnx() as cnx:
            unit, unit_alt, unit_alt_seq = create_archive_unit(None, cnx=cnx)
            bdo = create_data_object(unit_alt_seq)
            cnx.commit()

            unit.cw_clear_all_caches()
            self.assertEqual(unit.container, ())  # XXX arguable
            unit_alt_seq.cw_clear_all_caches()
            self.assertEqual(unit_alt_seq.container[0].eid, unit.eid)
            bdo.cw_clear_all_caches()
            self.assertEqual(bdo.container[0].eid, unit.eid)

            # test clone without reparenting
            cloned = cnx.create_entity(unit.cw_etype, user_annotation=u'clone',
                                       clone_of=unit)
            cnx.commit()
            cloned.cw_clear_all_caches()
            self.assertEqual(cloned.user_annotation, 'clone')
            cloned_unit_alt_seq = cloned.first_level_choice.content_sequence
            self.assertEqual(cloned_unit_alt_seq.container[0].eid, cloned.eid)
            cloned_bdo = (cloned_unit_alt_seq.reverse_seda_data_object_reference[0]
                          .seda_data_object_reference_id[0])
            self.assertEqual(cloned_bdo.container[0].eid, cloned.eid)

            # test clone with reparenting
            transfer = cnx.create_entity('SEDAArchiveTransfer', title=u'test profile')
            cloned = cnx.create_entity(unit.cw_etype,
                                       user_annotation=u'I am mandatory',
                                       clone_of=unit,
                                       seda_archive_unit=transfer)
            cnx.commit()
            cloned.cw_clear_all_caches()
            self.assertEqual(cloned.container[0].eid, transfer.eid)
            cloned.cw_clear_all_caches()
            cloned_unit_alt_seq = cloned.first_level_choice.content_sequence
            self.assertEqual(cloned_unit_alt_seq.container[0].eid, transfer.eid)
            cloned_bdo = (cloned_unit_alt_seq.reverse_seda_data_object_reference[0]
                          .seda_data_object_reference_id[0])
            self.assertEqual(cloned_bdo.container[0].eid, transfer.eid)
            cloned_bdo.cw_clear_all_caches()
            self.assertEqual(cloned_bdo.seda_binary_data_object[0].eid, transfer.eid)


class FakeEntity(object):
    cw_etype = 'Whatever'

    def __init__(self, _cw):
        self._cw = _cw

    def has_eid(self):
        return False


class PredicatesTC(CubicWebTC):

    def test_simplified_profile(self):
        simplified_profile_pred = simplified_profile()
        full_seda2_profile_pred = full_seda2_profile()
        with self.admin_access.web_request() as req:
            transfer = req.create_entity('SEDAArchiveTransfer', title=u'test profile')
            self.assertEqual(simplified_profile_pred(None, req, entity=transfer), 0)
            self.assertEqual(full_seda2_profile_pred(None, req, entity=transfer), 1)
            self.assertEqual(simplified_profile_pred(None, req, rset=transfer.as_rset()), 0)
            self.assertEqual(full_seda2_profile_pred(None, req, rset=transfer.as_rset()), 1)
            access_rule = req.create_entity('SEDAAccessRule', seda_access_rule=transfer)
            req.cnx.commit()  # needed to set the container relation
            self.assertEqual(simplified_profile_pred(None, req, entity=access_rule), 0)
            self.assertEqual(full_seda2_profile_pred(None, req, entity=access_rule), 1)
            req.form['__linkto'] = 'whatever:%s:whatever' % transfer.eid
            being_created = FakeEntity(req)
            self.assertEqual(simplified_profile_pred(None, req, entity=being_created), 0)
            self.assertEqual(full_seda2_profile_pred(None, req, entity=being_created), 1)
            del req.form['__linkto']
            req.form['arg'] = [text_type(transfer.eid)]
            self.assertEqual(simplified_profile_pred(None, req, entity=being_created), 0)
            self.assertEqual(full_seda2_profile_pred(None, req, entity=being_created), 1)
            transfer.cw_set(simplified_profile=True)
            self.assertEqual(simplified_profile_pred(None, req, entity=transfer), 1)
            self.assertEqual(full_seda2_profile_pred(None, req, entity=transfer), 0)


class ITreeTC(CubicWebTC):

    def assertChildren(self, entity, expected_eids):
        itree = entity.cw_adapt_to('ITreeBase')
        children = [x.eid for x in itree.iterchildren()]
        self.assertEqual(children, expected_eids)

    def assertParent(self, entity, expected_eid):
        itree = entity.cw_adapt_to('ITreeBase')
        parent = itree.parent()
        if parent:
            parent_eid = parent.eid
        else:
            parent_eid = None
        self.assertEqual(parent_eid, expected_eid)

    def test(self):
        with self.admin_access.client_cnx() as cnx:
            transfer = cnx.create_entity('SEDAArchiveTransfer', title=u'test profile')
            au, alt, seq = create_archive_unit(transfer)
            do_ref = cnx.create_entity('SEDADataObjectReference',
                                       seda_data_object_reference=seq)
            bdo = create_data_object(transfer,
                                     reverse_seda_data_object_reference_id=do_ref)
            cnx.commit()
            au.cw_clear_all_caches()
            bdo.cw_clear_all_caches()

            self.assertChildren(transfer, [bdo.eid, au.eid])
            self.assertChildren(au, [])
            self.assertParent(transfer, None)
            self.assertParent(au, transfer.eid)
            self.assertParent(bdo, transfer.eid)

            transfer.cw_set(simplified_profile=True)
            cnx.commit()
            au.cw_clear_all_caches()
            bdo.cw_clear_all_caches()

            self.assertChildren(transfer, [au.eid])
            self.assertChildren(au, [bdo.eid])
            self.assertParent(transfer, None)
            self.assertParent(au, transfer.eid)
            self.assertParent(bdo, au.eid)


class RuleFromETypeTC(unittest.TestCase):
    def test_rule_from_etype(self):
        for rule_type in ('access', 'appraisal', 'classification',
                          'reuse', 'dissemination', 'storage'):
            for prefix, suffix in [
                    ('SEDAAlt', 'RulePreventInheritance'),
                    ('SEDASeq', 'RuleRule'),
                    ('SEDA', 'Rule'),
            ]:
                self.assertEqual(rule_type_from_etype(prefix + rule_type.capitalize() + suffix),
                                 rule_type)


class ParentAndContainerTC(CubicWebTC):

    def test_nodata(self):
        with self.admin_access.web_request() as req:
            parent, container = parent_and_container(attrdict(_cw=req, has_eid=lambda: False))
            self.assertIsNone(parent)
            self.assertIsNone(container)

    def test_linkto(self):
        with self.admin_access.web_request() as req:
            transfer = req.cnx.create_entity('SEDAArchiveTransfer', title=u'test profile')
            req.form['__linkto'] = 'x:{0}:y'.format(transfer.eid)
            parent, container = parent_and_container(attrdict(_cw=req, has_eid=lambda: False))
            self.assertEqual(parent.eid, transfer.eid)
            self.assertEqual(container.eid, transfer.eid)

    def test_arg(self):
        with self.admin_access.web_request() as req:
            transfer = req.cnx.create_entity('SEDAArchiveTransfer', title=u'test profile')
            req.form['arg'] = [json.dumps(transfer.eid)]
            parent, container = parent_and_container(attrdict(_cw=req, has_eid=lambda: False))
            self.assertEqual(parent.eid, transfer.eid)
            self.assertEqual(container.eid, transfer.eid)

    def test_eid(self):
        with self.admin_access.web_request() as req:
            transfer = req.cnx.create_entity('SEDAArchiveTransfer', title=u'test profile')
            req.form['sedaContainerEID'] = text_type(transfer.eid)
            parent, container = parent_and_container(attrdict(_cw=req, has_eid=lambda: False))
            self.assertIsNone(parent)
            self.assertEqual(container.eid, transfer.eid)


class CustomEntitiesTC(CubicWebTC):

    def test_title(self):
        with self.admin_access.client_cnx() as cnx:
            for etype in ('SEDAArchiveUnit', 'SEDABinaryDataObject', 'SEDAPhysicalDataObject'):
                ent = cnx.create_entity(etype, user_annotation=u'bla bla\nbli bli blo\n')
                self.assertEqual(ent.dc_title(), u'bla bla')


if __name__ == '__main__':
    unittest.main()
