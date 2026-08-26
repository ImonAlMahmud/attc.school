# auth.md

This document describes how AI agents may interact with and register against Advance Training & Testing Center (ATTC) per the [auth.md specification](https://workos.com/auth-md).

## Agent Registration

- **Audience**: AI Agents, LLM crawlers, autonomous bots, and automated client applications
- **Register URI**: https://www.attc.school/auth.md
- **Registration Endpoint**: https://www.attc.school/auth.md
- **Identity Endpoint**: https://www.attc.school/auth.md
- **Claim Endpoint**: https://www.attc.school/auth.md
- **Claim URI**: https://www.attc.school/auth.md
- **Revocation Endpoint**: https://www.attc.school/.well-known/oauth-authorization-server
- **Revocation URI**: https://www.attc.school/.well-known/oauth-authorization-server
- **Identity Types Supported**: anonymous, agent, user, identity_assertion
- **Credential Types Supported**: none, bearer
- **Protected Resources**: None (Public Portal — all course specifications and materials are open)

### Registration Flows & Methods

#### 1. Anonymous Access
- **Identity Type**: `anonymous`
- **Credential Types Supported**: `none`, `bearer`
- **Claim URI**: https://www.attc.school/auth.md
- **Access Level**: Full read access to all public course catalogs, trade details, and agent discovery resources without credentials.

#### 2. Identity Assertion (ID-JAG)
- **Identity Type**: `identity_assertion`
- **Assertion Types Supported**: `urn:ietf:params:oauth:token-type:id-jag`, `verified_email`
- **Credential Types Supported**: `bearer`
- **Revocation Events Supported**: `https://schemas.openid.net/secevent/oauth/event-type/token-revocation`

#### 3. Verified Email
- **Identity Type**: `identity_assertion`
- **Assertion Types Supported**: `verified_email`
- **Credential Types Supported**: `bearer`
- **Claim URI**: https://www.attc.school/auth.md

## Site Identity

- **Name**: Advance Training & Testing Center — Official Portal
- **Domain**: https://www.attc.school
- **Issuer**: https://www.attc.school

## Access Model

All resources on this site are **publicly accessible**. No authentication or API keys are required to read content, browse vocational course syllabi, verify accreditation, or access machine-readable agent discovery endpoints.

## Agent Capabilities

Agents interacting with this site may:
- Read public course specifications, trade testing details, and fee structures
- Discover site structure via `/sitemap.xml`
- Read any page as Markdown via `Accept: text/markdown` content negotiation
- Discover APIs via `/.well-known/api-catalog`
- Discover AI catalog & capability manifest via `/.well-known/ai-catalog.json`
- Use MCP tooling via `/.well-known/mcp/server-card.json`
- Execute vocational agent skills via `/.well-known/agent-skills/index.json`

## OAuth & Resource Metadata

Discovery documents are published at:
- **OAuth Protected Resource Metadata (PRM)**: `/.well-known/oauth-protected-resource`
- **OAuth Authorization Server Metadata**: `/.well-known/oauth-authorization-server`
- **OpenID Connect Configuration**: `/.well-known/openid-configuration`
- **Supported Scopes**: `read`, `public`
- **Bearer Methods Supported**: `header`

```json
{
  "agent_auth": {
    "skill": "https://www.attc.school/auth.md",
    "register_uri": "https://www.attc.school/auth.md",
    "registration_endpoint": "https://www.attc.school/auth.md",
    "claim_uri": "https://www.attc.school/auth.md",
    "identity_endpoint": "https://www.attc.school/auth.md",
    "claim_endpoint": "https://www.attc.school/auth.md",
    "identity_types_supported": ["anonymous", "agent", "user", "identity_assertion"],
    "credential_types_supported": ["none", "bearer"],
    "anonymous": {
      "credential_types_supported": ["none", "bearer"],
      "claim_uri": "https://www.attc.school/auth.md"
    },
    "identity_assertion": {
      "assertion_types_supported": ["urn:ietf:params:oauth:token-type:id-jag", "verified_email"],
      "credential_types_supported": ["bearer"]
    },
    "revocation_endpoint": "https://www.attc.school/.well-known/oauth-authorization-server",
    "revocation_uri": "https://www.attc.school/.well-known/oauth-authorization-server",
    "events_supported": ["https://schemas.openid.net/secevent/oauth/event-type/token-revocation"]
  }
}
```

## Agent Discovery Resources

| Resource | URL |
|----------|-----|
| ARD AI Catalog | https://www.attc.school/.well-known/ai-catalog.json |
| Sitemap | https://www.attc.school/sitemap.xml |
| API Catalog | https://www.attc.school/.well-known/api-catalog |
| Agent Skills | https://www.attc.school/.well-known/agent-skills/index.json |
| MCP Server Card | https://www.attc.school/.well-known/mcp/server-card.json |
| OIDC Discovery | https://www.attc.school/.well-known/openid-configuration |
| Protected Resource | https://www.attc.school/.well-known/oauth-protected-resource |
| DNS-AID | https://www.attc.school/.well-known/dns-aid |
| DNS-AID Spec | https://www.attc.school/dns-aid.md |
