# DNS for AI Discovery (DNS-AID) Records Specification

This document details the published DNS for AI Discovery (DNS-AID) records for `attc.school` per draft-mozleywilliams-dnsop-dnsaid and RFC 9460.

## Overview

DNS-AID enables AI agents to perform DNS-based discovery of agent entrypoints and capabilities prior to or alongside HTTPS requests.

## Published SVCB/HTTPS Discovery Records

### Index Agent Entrypoint (`_index._agents.attc.school`)
```dns
_index._agents.attc.school. IN HTTPS 1 . (
    alpn="h2,h3"
    port="443"
    ipv4hint=104.21.50.1
    key65300="path=/.well-known/agent-skills/index.json"
)
```

### Agent-to-Agent Communication Endpoint (`_a2a._agents.attc.school`)
```dns
_a2a._agents.attc.school. IN HTTPS 1 . (
    alpn="h2,h3"
    port="443"
    key65300="path=/.well-known/mcp/server-card.json"
)
```

### MCP Agent Service Endpoint (`_mcp._agents.attc.school`)
```dns
_mcp._agents.attc.school. IN HTTPS 1 . (
    alpn="h2,h3"
    port="443"
    key65300="path=/.well-known/mcp/server-card.json"
)
```

## Security & DNSSEC Validation

- The `_agents.attc.school` subzone is signed with DNSSEC (Algorithm 13 - ECDSA Curve P-256 with SHA-256).
- Validating resolvers will return data with the `AD` (Authenticated Data) bit set, guaranteeing record authenticity and preventing spoofing.
