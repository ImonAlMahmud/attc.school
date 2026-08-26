/**
 * ATTC Edge Middleware — Dynamic Well-Known Discovery, Agent Auth & Markdown Content Negotiation
 */

const LINK_HEADER_VALUE = [
  '</.well-known/ai-catalog.json>; rel="ai-catalog"',
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</sitemap.xml>; rel="service-doc"',
  '</.well-known/oauth-protected-resource>; rel="oauth-protected-resource"',
  '</.well-known/oauth-authorization-server>; rel="oauth-authorization-server"',
  '</.well-known/agent-skills/index.json>; rel="agent-skills"',
  '</.well-known/mcp/server-card.json>; rel="mcp-server-card"',
  '</.well-known/dns-aid>; rel="dns-aid"',
  '</auth.md>; rel="authorizing-agent"',
  '</auth.md>; rel="agent-auth"',
  '</auth.md>; rel="skill"'
].join(', ');

const BYPASS_HEADER = 'x-middleware-markdown-bypass';

export const config = {
  matcher: ['/', '/((?!_next|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|woff|woff2|ttf|otf|mp4)$).*)']
};

function jsonResponse(body) {
  return new Response(JSON.stringify(body, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Vary": "Accept, Host",
      "Link": LINK_HEADER_VALUE,
      "X-Content-Type-Options": "nosniff"
    },
  });
}

export default async function middleware(request) {
  if (request.headers.get(BYPASS_HEADER)) {
    return;
  }

  const url = new URL(request.url);
  const origin = url.origin;
  const path = url.pathname.toLowerCase();

  const buildAgentAuth = (originUrl) => ({
    skill: `${originUrl}/auth.md`,
    register_uri: `${originUrl}/auth.md`,
    registration_endpoint: `${originUrl}/auth.md`,
    claim_uri: `${originUrl}/auth.md`,
    identity_endpoint: `${originUrl}/auth.md`,
    claim_endpoint: `${originUrl}/auth.md`,
    identity_types_supported: ["anonymous", "agent", "user", "identity_assertion"],
    credential_types_supported: ["none", "bearer"],
    anonymous: {
      credential_types_supported: ["none", "bearer"],
      claim_uri: `${originUrl}/auth.md`
    },
    identity_assertion: {
      assertion_types_supported: ["urn:ietf:params:oauth:token-type:id-jag", "verified_email"],
      credential_types_supported: ["bearer"]
    },
    claims_supported: [],
    revocation_endpoint: `${originUrl}/.well-known/oauth-authorization-server`,
    revocation_uri: `${originUrl}/.well-known/oauth-authorization-server`,
    events_supported: [
      "https://schemas.openid.net/secevent/oauth/event-type/token-revocation"
    ]
  });

  // Handle /.well-known/ai-catalog or ai-catalog.json
  if (path === '/.well-known/ai-catalog' || path === '/.well-known/ai-catalog.json') {
    return jsonResponse({
      "$schema": "https://agenticresourcediscovery.org/schemas/v1.0/ai-catalog.schema.json",
      "specVersion": "1.0",
      "host": {
        "displayName": "Advance Training & Testing Center (ATTC)",
        "identifier": origin
      },
      "entries": [
        {
          "identifier": "urn:air:attc.school:mcp:server-card",
          "displayName": "ATTC MCP Server Card",
          "type": "application/json",
          "url": `${origin}/.well-known/mcp/server-card.json`,
          "description": "Model Context Protocol (MCP) server providing access to ATTC vocational training programs, courses, and admissions tools.",
          "representativeQueries": [
            "What vocational courses and testing does ATTC provide?",
            "Connect to ATTC MCP server endpoint for tools",
            "Enroll in a vocational course or inquire via MCP tools"
          ]
        },
        {
          "identifier": "urn:air:attc.school:skills:index",
          "displayName": "ATTC Agent Skills Index",
          "type": "application/json",
          "url": `${origin}/.well-known/agent-skills/index.json`,
          "description": "Agent skills index offering capability descriptors for vocational course inquiries, enrollment applications, and contact support.",
          "representativeQueries": [
            "Find agent skills for contacting ATTC admissions",
            "How to submit an enrollment application to ATTC",
            "Inquire about Plasterer, Tiler, Bar Bending, Formwork Carpentry, and Bricklayer courses"
          ]
        },
        {
          "identifier": "urn:air:attc.school:docs:llms",
          "displayName": "ATTC Structured LLM Knowledge Base",
          "type": "text/plain",
          "url": `${origin}/llms.txt`,
          "description": "Structured AI summary and course directory for LLM search engines and reasoning agents.",
          "representativeQueries": [
            "Overview of Advance Training & Testing Center courses, syllabus, and hostel facilities",
            "ISO certified vocational trade testing and certifications in Dhaka",
            "Admission eligibility and contact info for ATTC Dhaka"
          ]
        },
        {
          "identifier": "urn:air:attc.school:auth:authorizing-agent",
          "displayName": "ATTC Agent Authorization Guide",
          "type": "text/markdown",
          "url": `${origin}/auth.md`,
          "description": "Instructions and guidelines for AI agents authorizing and authenticating with ATTC services per RFC 8414 and RFC 8707.",
          "representativeQueries": [
            "How do AI agents authenticate with ATTC?",
            "Read agent authorization policies for ATTC",
            "What credentials or headers are needed for ATTC agent requests?"
          ]
        },
        {
          "identifier": "urn:air:attc.school:api:catalog",
          "displayName": "ATTC RFC 9264 API Catalog",
          "type": "application/linkset+json",
          "url": `${origin}/.well-known/api-catalog.json`,
          "description": "RFC 9264 linkset catalog for ATTC public endpoints and API documentation.",
          "representativeQueries": [
            "Discover ATTC API documentation and endpoints",
            "Access linkset catalog for vocational training services"
          ]
        }
      ]
    });
  }

  // Handle /.well-known/oauth-authorization-server
  if (path === '/.well-known/oauth-authorization-server' || path === '/.well-known/oauth-authorization-server.json') {
    return jsonResponse({
      issuer: origin,
      authorization_endpoint: `${origin}/.well-known/oauth-authorization-server`,
      token_endpoint: `${origin}/.well-known/oauth-authorization-server`,
      jwks_uri: `${origin}/.well-known/http-message-signatures-directory`,
      response_types_supported: ["token"],
      grant_types_supported: ["client_credentials"],
      token_endpoint_auth_methods_supported: ["none", "client_secret_basic"],
      scopes_supported: ["read", "public"],
      registration_endpoint: `${origin}/auth.md`,
      agent_auth: buildAgentAuth(origin)
    });
  }

  // Handle /.well-known/oauth-protected-resource
  if (path === '/.well-known/oauth-protected-resource' || path === '/.well-known/oauth-protected-resource.json') {
    return jsonResponse({
      resource: origin,
      authorization_servers: [origin],
      scopes_supported: ["read", "public"],
      bearer_methods_supported: ["header"],
      resource_documentation: `${origin}/auth.md`
    });
  }

  // Handle /.well-known/agent-auth
  if (path === '/.well-known/agent-auth' || path === '/.well-known/agent-auth.json' || path === '/.well-known/agent_auth' || path === '/.well-known/auth-md') {
    return jsonResponse(buildAgentAuth(origin));
  }

  // Handle /.well-known/openid-configuration
  if (path === '/.well-known/openid-configuration' || path === '/.well-known/openid-configuration.json') {
    return jsonResponse({
      issuer: origin,
      authorization_endpoint: `${origin}/.well-known/oauth-authorization-server`,
      token_endpoint: `${origin}/.well-known/oauth-authorization-server`,
      jwks_uri: `${origin}/.well-known/http-message-signatures-directory`,
      response_types_supported: ["token"],
      subject_types_supported: ["public"],
      id_token_signing_alg_values_supported: ["RS256"],
      grant_types_supported: ["client_credentials"],
      scopes_supported: ["read", "public"],
      claims_supported: [],
      userinfo_endpoint: `${origin}/.well-known/openid-configuration`,
      registration_endpoint: `${origin}/auth.md`,
      agent_auth: buildAgentAuth(origin)
    });
  }

  // Handle /.well-known/dns-aid
  if (path === '/.well-known/dns-aid' || path === '/.well-known/dns-aid.json') {
    const domainHost = url.hostname;
    return jsonResponse({
      "$schema": "https://dns-aid.org/schemas/v1/dns-aid.json",
      "domain": domainHost,
      "records": [
        {
          "name": "_index._agents",
          "type": "HTTPS",
          "priority": 1,
          "target": `${domainHost}.`,
          "params": {
            "alpn": ["h3", "h2"],
            "port": 443,
            "key65300": "path=/.well-known/agent-skills/index.json"
          }
        },
        {
          "name": "_a2a._agents",
          "type": "HTTPS",
          "priority": 1,
          "target": `${domainHost}.`,
          "params": {
            "alpn": ["a2a"],
            "port": 443,
            "key65300": "path=/.well-known/mcp/server-card.json"
          }
        },
        {
          "name": "_mcp._agents",
          "type": "HTTPS",
          "priority": 1,
          "target": `${domainHost}.`,
          "params": {
            "alpn": ["mcp"],
            "port": 443,
            "key65300": "path=/.well-known/mcp/server-card.json"
          }
        }
      ]
    });
  }

  // Handle /auth.md directly with proper headers
  if (path === '/auth.md') {
    try {
      const authUrl = new URL('/auth.md', request.url);
      const res = await fetch(authUrl, {
        headers: { [BYPASS_HEADER]: '1' }
      });
      if (res.ok) {
        const text = await res.text();
        const tokenEstimate = Math.ceil(text.length / 4);
        return new Response(text, {
          status: 200,
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Vary": "Accept",
            "x-markdown-tokens": tokenEstimate.toString(),
            "Link": LINK_HEADER_VALUE,
            "X-Content-Type-Options": "nosniff"
          }
        });
      }
    } catch (e) {}
  }

  // Content Negotiation for Markdown (Accept: text/markdown or AI User-Agents)
  const acceptHeader = request.headers.get('accept') || '';
  const userAgent = request.headers.get('user-agent') || '';
  const wantsMarkdown = acceptHeader.includes('text/markdown') || 
                        userAgent.includes('GPTBot') || 
                        userAgent.includes('ClaudeBot') || 
                        userAgent.includes('PerplexityBot') ||
                        userAgent.includes('AgentSkillsBot');

  if (wantsMarkdown) {
    let mdPath = '/index.md';
    if (path !== '/' && path !== '/index.html' && path !== '/index') {
      const cleanPath = path.endsWith('.html') ? path.slice(0, -5) : path;
      mdPath = `${cleanPath}.md`;
    }

    try {
      const targetUrl = new URL(mdPath, request.url);
      const res = await fetch(targetUrl, {
        headers: { [BYPASS_HEADER]: '1' }
      });
      if (res.ok) {
        const text = await res.text();
        const tokenEstimate = Math.ceil(text.length / 4);
        return new Response(text, {
          status: 200,
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Vary": "Accept",
            "x-markdown-tokens": tokenEstimate.toString(),
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "public, max-age=3600, must-revalidate",
            "Link": LINK_HEADER_VALUE,
            "X-Content-Type-Options": "nosniff"
          }
        });
      }
    } catch (e) {}

    // Fallback to llms.txt if specific markdown file wasn't matched
    try {
      const fallbackUrl = new URL('/llms.txt', request.url);
      const res = await fetch(fallbackUrl, {
        headers: { [BYPASS_HEADER]: '1' }
      });
      if (res.ok) {
        const text = await res.text();
        const tokenEstimate = Math.ceil(text.length / 4);
        return new Response(text, {
          status: 200,
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Vary": "Accept",
            "x-markdown-tokens": tokenEstimate.toString(),
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "public, max-age=3600, must-revalidate",
            "Link": LINK_HEADER_VALUE,
            "X-Content-Type-Options": "nosniff"
          }
        });
      }
    } catch (e) {}
  }

  // Pass through all standard requests to Vercel origin with Link header
  try {
    const response = await fetch(request, {
      headers: {
        ...Object.fromEntries(request.headers),
        [BYPASS_HEADER]: '1'
      }
    });
    const newHeaders = new Headers(response.headers);
    newHeaders.set("Link", LINK_HEADER_VALUE);
    newHeaders.set("X-Content-Type-Options", "nosniff");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  } catch (err) {
    return new Response("Internal Edge Error", { status: 500 });
  }
}
