# -*- coding: utf-8 -*-
from unittest.mock import Mock, patch

from Crypto.PublicKey import RSA

from federation.entities.diaspora.entities import DiasporaPost
from federation.outbound import handle_create_payload


class TestHandleCreatePayloadBuildsAPayload(object):
    @patch("federation.outbound.Protocol")
    def test_handle_create_payload_builds_an_xml(self, mock_protocol_class):
        mock_protocol = Mock()
        mock_protocol_class.return_value = mock_protocol
        from_user = Mock()
        entity = DiasporaPost()
        handle_create_payload(entity, from_user)
        mock_protocol.build_send.assert_called_once_with(entity=entity, from_user=from_user, to_user=None)

    @patch("federation.outbound.get_outbound_entity")
    def test_handle_create_payload_calls_get_outbound_entity(self, mock_get_outbound_entity):
        mock_get_outbound_entity.return_value = DiasporaPost()
        from_user = Mock(private_key=RSA.generate(2048), handle="foobar@domain.tld")
        entity = DiasporaPost()
        handle_create_payload(entity, from_user)
        assert mock_get_outbound_entity.called
