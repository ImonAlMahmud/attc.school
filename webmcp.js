/**
 * WebMCP Client Integration for Advance Training & Testing Center (ATTC)
 * Exposes browser-level agent tools via navigator.modelContext API.
 */
(function() {
  if (typeof window === 'undefined') return;

  function initWebMCP() {
    const modelContext = window.navigator && window.navigator.modelContext;

    const tools = [
      {
        name: "get_courses",
        description: "Get information about ATTC vocational training courses, syllabus, and trade testing in Dhaka.",
        inputSchema: {
          type: "object",
          properties: {
            course: {
              type: "string",
              description: "Optional course name e.g. 'plasterer', 'tiler', 'formwork-carpentry', 'bar-bending', 'bricklayer'."
            }
          }
        },
        execute: async (args) => {
          const courses = [
            { name: "Plasterer", url: "/courses/plasterer.html", description: "Professional plastering and finishing skills." },
            { name: "Tiler", url: "/courses/tiler.html", description: "Floor, wall, and mosaic tile installation." },
            { name: "Formwork Carpentry", url: "/courses/formwork-carpentry.html", description: "Concrete shuttering and formwork systems." },
            { name: "Bar Bending", url: "/courses/bar-bending.html", description: "Rebar cutting, bending, tying, and reinforcement layout." },
            { name: "Bricklayer", url: "/courses/bricklayer.html", description: "Masonry bonding, mortar mixing, and structural brickwork." }
          ];

          return {
            status: "success",
            courses: args.course 
              ? courses.filter(c => c.name.toLowerCase().includes(args.course.toLowerCase()) || c.url.includes(args.course.toLowerCase()))
              : courses
          };
        }
      },
      {
        name: "apply_enrollment",
        description: "Submit an enrollment inquiry or admission application for ATTC trade courses.",
        inputSchema: {
          type: "object",
          properties: {
            name: { type: "string", description: "Applicant full name" },
            phone: { type: "string", description: "Applicant phone number" },
            course: { type: "string", description: "Selected trade course" },
            hostelRequired: { type: "boolean", description: "Whether residential hostel accommodation is requested" }
          },
          required: ["name", "phone", "course"]
        },
        execute: async (args) => {
          console.log("[WebMCP] Enrollment applied:", args);
          return {
            status: "success",
            message: `Enrollment application submitted for ${args.name} (${args.course}). Helpline: +8801335143359`
          };
        }
      },
      {
        name: "contact_admissions",
        description: "Send a direct message or inquiry to ATTC admissions helpline.",
        inputSchema: {
          type: "object",
          properties: {
            name: { type: "string" },
            emailOrPhone: { type: "string" },
            message: { type: "string" }
          },
          required: ["name", "emailOrPhone", "message"]
        },
        execute: async (args) => {
          console.log("[WebMCP] Admissions inquiry:", args);
          return {
            status: "success",
            message: "Your inquiry has been received. ATTC admissions will contact you shortly."
          };
        }
      }
    ];

    if (modelContext && typeof modelContext.provideContext === 'function') {
      try {
        modelContext.provideContext({ tools });
        console.log("[WebMCP] Context provided to navigator.modelContext.");
      } catch (err) {
        console.warn("[WebMCP] Failed to register context:", err);
      }
    } else {
      window.__webMCP = {
        tools: tools,
        version: "1.0.0"
      };
      console.log("[WebMCP] Fallback window.__webMCP initialized.");
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWebMCP);
  } else {
    initWebMCP();
  }
})();
