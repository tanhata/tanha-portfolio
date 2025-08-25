import React, { useState, useEffect } from 'react';

const ProjectCard = ({ project, theme }) => {
  if (project.externalLink) {
    return (
      <a 
        href={project.externalLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`project ${project.className}`} 
        data-category={project.category}
      >
        <div className="project-image">
          <img 
            src={project.imageData} 
            alt={project.title}
          />
          <div className="external-link-indicator">
            <span>↗</span>
          </div>
        </div>
        <h3 className="project-title">{project.title}</h3>
        <div className="project-type">{project.type}</div>
        <p className="project-description">{project.description}</p>
      </a>
    );
  }

  return (
    <a 
      href="#" 
      onClick={(e) => { e.preventDefault(); window.currentPortfolio?.setCurrentPage(`project-${project.id}`); }} 
      className={`project ${project.className}`} 
      data-category={project.category}
    >
      <div className="project-image">
        <img 
          src={project.imageData} 
          alt={project.title}
        />
      </div>
      <h3 className="project-title">{project.title}</h3>
      <div className="project-type">{project.type}</div>
      <p className="project-description">{project.description}</p>
    </a>
  );
};

const ProjectDetailPage = ({ project, onBack, theme }) => {
  if (!project) return null;

  // Project-specific content based on ID
  const getProjectContent = (projectId) => {
    const contentMap = {
      'mcp': {
        subtitle: "Interface for Multi-Agent Interaction",
        role: "Lead Product Designer",
        team: "Founding Machine Learning Developers, Product Manager, Frontend Engineers",
        content: [
          "Model Communication Protocol (MCP) is a framework for orchestrating multiple language models as coordinated agents—each with a defined role, scoped context, and turn in the reasoning chain. It shifts prompting from monolithic to modular: models summarize, critique, and rewrite each other's outputs in sequence, forming a structured dialogue.",
          "",
          "While MCP introduces a powerful mental model, current workflows are often fragmented—spread across notebooks, orchestration libraries, and opaque API calls.",
          "",
          "This project visualizes MCP from an interface perspective—making agent interactions transparent, inspectable, and user-directed. Users assign roles, define execution order, and trace how ideas evolve across model handoffs. Designed through both a product and engineering lens, the system supports reproducibility, orchestration, and step-level debugging.",
          "",
          "## Unblocking the Workflow",
          "",
          "MCPs involve multiple moving parts — developers define specs, PMs scope features, engineers implement, and designers shape behavior. But without a shared interface, the flow breaks. Specs live across Notion, Slack, and code. This tool restructures that journey: model behavior is visualized, editable, and versioned — so every role stays in sync.",
          "",
          "## Designing for Dialogue",
          "",
          "Agents can be confusing-- make model-to-model collaboration legible. I leaned on conversation as a UI structure — each agent speaks, critiques, or rewrites. Users assign roles like Summarizer, Critic, or Rewriter to selected models. The interface supports multi-step task orchestration through simple dropdowns and a guided prompt builder.",
          "",
          "## Conversation Playback",
          "",
          "Outputs are presented as threaded messages, reflecting the sequence and evolution of ideas. The interface supports user feedback mid-dialogue, offering opportunities to intervene, redirect, or co-create.",
          "",
          "## Agent & Model Onboarding",
          "",
          "Educational overlays help non-technical users understand how agent roles function, and how models differ in tone, reliability, and application.",
          "",
          "## Session History & Sharing",
          "",
          "A lightweight session dashboard where past conversations can be reviewed, duplicated, or exported. Each session displays a timestamp, the assigned models and roles, and a preview of the final output. Users can sort by agent, task type, or date to surface relevant collaborations.",
          "",
          "## Developer Console: Multi-Agent Config & Execution",
          "",
          "This screen bridges interface design with the realities of modern LLMOps. It allows developers to structure multi-agent chains by assigning roles (e.g., Summarizer, Critic) to specific models, with full control over system prompts, temperature, and token limits. Configs are output as JSON payloads — not as an afterthought, but as a first-class asset for versioning and API execution.",
          "",
          "Each agent's response is logged with its inputs, latency, and token usage visible — because understanding model behavior at the step level is essential when chaining reasoning tasks across systems. Every interaction is replayable and forkable, supporting fast iteration and fine-grained debugging.",
          "",
          "The API panel integrates directly with live endpoints and code exports, supporting transition from prototype to production. By exposing telemetry (rate limits, response times, token consumption) alongside structured configuration, this interface doesn't just make LLM workflows usable — it makes them observable and maintainable.",
          "",
          "## User Journey & Flow",
          "",
          "The user experience maps a clear path from concept to execution. Users begin by defining their multi-agent task, selecting models and assigning roles, then watch as agents collaborate in real-time. The interface provides intervention points throughout—allowing users to redirect conversations, adjust parameters, or fork successful patterns into new workflows.",
          "",
          "## Making Model Communication Legible",
          "",
          "Building this interface began as an exploration of how multiple AI agents could collaborate more transparently—but it quickly evolved into a deeper question of how humans, too, might better understand, debug, and direct these interactions. What emerged is a system that treats multi-agent workflows not as code-first automations, but as legible, structured conversations.",
          "",
          "Through role assignment, sequential reasoning, and step-level traceability, this tool reframes prompting as orchestration—making LLM behavior both observable and controllable.",
          "",
          "## Reflection & Future Directions",
          "",
          "While this prototype focuses on visualizing core MCP flows, there's exciting room for future exploration:",
          "",
          "• Inter-agent memory systems (e.g., letting agents remember and reference prior states)",
          "• Non-linear agent logic (e.g., conditionals, feedback loops, and voting)",
          "• Live debugging + annotation layers for teams reviewing AI behavior",
          "• LLMOps integrations like exporting traces to LangSmith, OpenPipe, or Hugging Face Spaces",
          "• More expressive agent identities including tone preferences, formatting styles, or instructional personas",
          "",
          "Above all, this project reflects a belief that as models become more collaborative, so too must our tools—giving people a way to reason about AI reasoning."
        ],
        images: ['/images/mcp.gif', '/images/projects/mcp/Conversation.png', '/images/projects/mcp/Dev.png', '/images/projects/mcp/History.png', '/images/projects/mcp/mcp-1.png', '/images/projects/mcp/Model Guide.png', '/images/projects/mcp/Setup.png', '/images/projects/mcp/Share.png', '/images/projects/mcp/Trace.png', '/images/projects/mcp/Understanding Agents.png', '/images/projects/mcp/user journey.png']
      },
      'forma': {
        subtitle: "TEXT-SVG-IMAGE GENERATION ITERATION PLATFORM",
        role: "Sr. Product Designer",
        team: "Machine Learning Engineer, Founding Frontend Developer",
        content: [
          "This image-generating platform reimagines how users engage with generative art by merging intuitive creation tools with a transparent ecosystem for attribution, discovery, and iteration.",
          "While generative tools often obscure the labor behind machine-made art, this platform foregrounds the time, iteration, and inspiration behind each piece.",
          "",
          "## WELCOME",
          "",
          "The welcome flow is intentionally minimal - a three-screen sequence consisting of a logo splash, followed by sign-up or sign-in. In a product that leverages complex machine learning systems and layered image iteration, the introduction is deliberately pared back.",
          "",
          "## DISCOVER", 
          "",
          "A scrollable feed surfaces trending and curated generative works. Clicking into any image reveals its creation journey - including iterations, total time, prompt history, and credited inspiration. Featured artists are showcased with bio blurbs and linked works.",
          "",
          "## CREATE + ITERATE",
          "",
          "Users generate images using a smart fill-in-the-blank prompt system, with controls for style, influence, and vibe. Outputs are editable as SVGs with a Figma-like toolbar, making it easy to tweak, remix, and iterate. Time and edit history are tracked to reflect effort.",
          "",
          "## ARTISTIC LINEAGE", 
          "",
          "This platform doesn't erase the origin of visual inspiration. It actively surfaces the artists, styles, and practices that shape generative works. Every image carries a thread back to its non-AI source.",
          "",
          "Original artists are credited throughout. Their profiles feature original works, a tab of inspired creations, and short bios with imagery - reinforcing transparency and showing their influence across the platform.",
          "",
          "## USER PROFILE",
          "",
          "Each user has a profile with tabs for created, liked, saved, and reposted work. The UI encourages identity-building and creative exploration, while tracking iteration timelines to celebrate the craft of generative art.",
          "## MACHINE LEARNING FOUNDATIONS",
          "The creative engine is powered by a few key ML-driven features that enhance control and transparency throughout the generation pipeline:",
          "## Prompt Temperature",
          "Controls allow users to modulate the randomness and creative looseness of their image generations, from structured to wildly abstract.",
          "## SVG-Based Output & Iteration Tracking",
          "Each visual is editable post-generation. Users can fine-tune details, mask out elements, and re-generate parts, creating a clear history of iterative effort.",
          "## Artist Influence Matching",
          "Leverages similarity search across training embeddings to surface likely inspirations behind generated works. These matched artists are credited, and users can explore their original pieces - spotlighting the real creatives behind the data.",
        ],
        images: [
          '/images/forma.jpg',
          '/images/projects/forma/forma1.png',
          '/images/projects/forma/forma2.png', 
          '/images/projects/forma/forma3.png',
          '/images/projects/forma/forma4.png',
          '/images/projects/forma/forma5.png'
        ]
      },
      'muse': {
        subtitle: "Reimagining the Museum Experience: Smart Navigation & AR Exploration Confidential Client 8XX579",
        role: "Sr. Product Designer",
        team: "Frontend Developer, Product Manager, Software Engineer (FS), iOS Mobile Engineer, MLE: AR/VR ",
        content: [
          "## Reimagining the Museum Experience",
          "Most museum apps are functional but flat. They provide basic maps and lists, but don't account for the way people actually move through and experience space. This project reimagined the museum guide — not as a static app, but as a context-aware spatial experience layered with exploration, orientation, and storytelling.",
          "## Mapping the Existing User Journey",
          "The existing flow revealed long stretches without context, requiring users to exit the app or retrace steps. It became clear that content needed to be tightly integrated with spatial navigation — not siloed in menus.",
          
          "Analyzing visitor behavior uncovered two core insights: Over 40% of visit time was spent trying to find locations. Most users abandoned the app after the first map interaction. These findings guided the structural redesign — the experience needed to adapt to physical movement and reduce friction in discovery.",
          "## Designing the Flow", 
          "The redesigned system flows naturally from 2D map → 3D environment → object-level stories. This progression lets users zoom in and out as they explore, surfacing relevant content without overwhelming the interface. Wireframes were built to test structure, hierarchy, and movement. The goal was to make exploration feel intuitive — like you're walking through the space, not clicking through an app.",
          "",
          "## A Layered Experience",
          "To solve this, the app was built around three core components, layered seamlessly into the navigation: A live 2D wayfinding map that centers the visitor in real time and helps them navigate. A 3D spatial experience that previews exhibit zones, rooms, and transitions between spaces. A Featured Works section, embedded within the map and galleries, where users can explore individual objects, stories, and artist details",
          "This structure lets visitors zoom in and out naturally — from building → exhibit → object — without losing their place or context.", 
          "## 2D Map Navigation",
          "A clean, zoomable map helps users orient themselves within the museum. Visitors can tap to preview galleries, view current location, and follow visual wayfinding cues designed to mirror real-world signage.",
          "Original artists are credited throughout. Their profiles feature original works, a tab of inspired creations, and short bios with imagery - reinforcing transparency and showing their influence across the platform.",
          "",
          "## 3D Spatial Experience",
          "The 3D mode offers a layered, immersive view of the museum layout. Users can explore floors and rooms in spatial context, making the app feel like an extension of the physical space.",
          "The creative engine is powered by a few key ML-driven features that enhance control and transparency throughout the generation pipeline:",

          "## Featured Exhibits & Object Detail",
          "A curated section surfaces key works and exhibitions. Each object opens into an editorial-style layout, offering rich descriptions, artist context, and optional AR previews for selected pieces.",
          "## System Architecture Overview",
          "Data Collection: User interactions (clicks, dwell time, exhibit views), indoor location (BLE beacons or WiFi triangulation), time of visit",
          "Processing Pipeline", 
          "Event data is streamed and cleaned using Python + BigQuery, then passed to a lightweight content recommendation engine (collaborative filtering + content-based hybrid model)",
          "## Model Outputs",
          "Personalized exhibit recommendations shown in the Featured tab: Dynamic reorder of UI cards based on predicted interest score. Traffic heatmaps sent to a curator-facing dashboard (Metabase prototype). Feedback loop: User behavior is re-ingested to fine-tune recommendations over time. Privacy: All data collection is anonymized and opt-in, with local storage fallback for one-time guest users",
          "## Tooling",
          "Python (data pipeline), BigQuery (storage & queries), Scikit-learn (prototype ML models), Metabase (dashboard), Figma (UX/UI)"
        ],
        images: [
          '/images/projects/muse/muse1.png',
          '/images/projects/muse/muse2.png',
          '/images/projects/muse/muse3.png',
          '/images/projects/muse/muse4.png',
          '/images/projects/muse/muse5.png',
          '/images/projects/muse/muse6.png',
          '/images/projects/muse/muse7.png',
          '/images/projects/muse/muse8.gif',
          '/images/projects/muse/muse9.gif',
          '/images/projects/muse/muse10.png',
          '/images/projects/muse/muse11.gif|/images/projects/muse/muse12.gif',
          '/images/projects/muse/muse13.png',
          '/images/projects/muse/muse14.png',
          '/images/projects/muse/muse15.png',
          '/images/projects/muse/muse16.png',
        ]
      },
      'default': {
        content: [
          "This project showcases innovative design and technical solutions.",
          "",
          "Details about this project will be available soon."
        ],
        images: [project.imageData]
      }
    };

    return contentMap[projectId] || contentMap['default'];
  };

  const content = getProjectContent(project.id);

  const renderContent = () => {
    const elements = [];
    
    // Define specific image mappings for each project
    const getImageForHeading = (heading, projectId) => {
      const mappings = {
        'muse': {
          "Reimagining the Museum Experience": 0,
          "Mapping the Existing User Journey": 1,
          "Designing the Flow": 2,
          "A Layered Experience": 3,
          "2D Map Navigation": 4,
          "3D Spatial Experience": 5,
          "Featured Exhibits & Object Detail": 6,
          "System Architecture Overview": 7,
          "Model Outputs": 8,
          "Tooling": 9
        },
        'mcp': {
          "Unblocking the Workflow": 1,
          "Designing for Dialogue": 2,
          "Conversation Playback": 3,
          "Agent & Model Onboarding": 4,
          "Session History & Sharing": 5,
          "Developer Console: Multi-Agent Config & Execution": 6,
          "User Journey & Flow": 7,
          "Making Model Communication Legible": 8,
          "Reflection & Future Directions": 9
        },
        'forma': {
          "WELCOME": 1,
          "DISCOVER": 2,
          "CREATE + ITERATE": 3,
          "ARTISTIC LINEAGE": 4,
          "USER PROFILE": 5,
          "MACHINE LEARNING FOUNDATIONS": 6
        }
      };
      
      const projectMapping = mappings[projectId];
      if (projectMapping && projectMapping[heading] !== undefined) {
        return content.images[projectMapping[heading]];
      }
      return null;
    };

    content.content.forEach((text, index) => {
      if (text === "") {
        elements.push(<br key={`br-${index}`} />);
      } else if (text.startsWith("## ")) {
        const headingText = text.replace("## ", "");
        elements.push(
          <h2 key={`h2-${index}`} className="content-heading">
            {headingText}
          </h2>
        );
        
        // Get the specific image for this heading
        const imageData = getImageForHeading(headingText, project.id);
        
        if (imageData) {
          if (typeof imageData === 'string' && imageData.includes('|')) {
            const [leftImg, rightImg] = imageData.split('|');
            elements.push(
              <div key={`img-${index}`} className="content-image-pair">
                <div className="side-by-side-images">
                  <img src={leftImg} alt={`${project.title} - ${headingText} (1)`} />
                  <img src={rightImg} alt={`${project.title} - ${headingText} (2)`} />
                </div>
              </div>
            );
          } else {
            elements.push(
              <div key={`img-${index}`} className="content-image">
                <img src={imageData} alt={`${project.title} - ${headingText}`} />
              </div>
            );
          }
        }
      } else {
        elements.push(
          <p key={`p-${index}`} className="content-paragraph">
            {text}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div className="project-detail">
      <div className="project-detail-header">
        <button onClick={onBack} className="back-button">
          ← Back to Work
        </button>
      </div>

      <div className="project-hero-simple">
        <h1 className="project-detail-title">{project.title}</h1>
        {content.subtitle && (
          <p className="project-detail-subtitle">{content.subtitle}</p>
        )}
        
        {content.role && (
          <div className="project-meta-simple">
            <p><strong>Role:</strong> {content.role}</p>
            {content.team && <p><strong>Team:</strong> {content.team}</p>}
          </div>
        )}
      </div>

      <div className="project-content-simple">
        {renderContent()}
      </div>

      <div className="project-navigation">
      </div>
    </div>
  );
};

const AboutPage = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Film photos centered and compact for better widescreen display
  const filmPhotos = [
    {
      id: 1,
      src: '/images/tanha.jpg',
      caption: 'Candid in Kyoto',
      galleryX: 15,
      galleryY: 68,
      width: 140,
      height: 180,
      orientation: 'portrait'
    },
    {
      id: 2,
      src: 'images/about/8AF0AAAC-B8CB-4347-8DDE-D1504A0358BA.jpg',
      caption: 'phase 1 build',
      galleryX: 27,
      galleryY: 68,
      width: 160,
      height: 120,
      orientation: 'landscape'
    },
    {
      id: 3,
      src: 'images/about/776A973B-1C0C-4623-A390-4F5469BA2454.JPG',
      caption: 'mom & I in Berkeley',
      galleryX: 39,
      galleryY: 68,
      width: 140,
      height: 180,
      orientation: 'portrait'
    },
    {
      id: 4,
      src: 'images/about/IMG_2989.JPG',
      caption: 'Arabica % in Japan',
      galleryX: 51,
      galleryY: 68,
      width: 140,
      height: 180,
      orientation: 'portrait'
    },
    {
      id: 5,
      src: 'images/about/IMG_9950.JPG',
      caption: 'Nemahsis concert @ Webster Hall, NYC',
      galleryX: 63,
      galleryY: 68,
      width: 160,
      height: 120,
      orientation: 'landscape'
    },
    {
      id: 6,
      src: 'images/about/IMG_8660.JPG',
      caption: 'Chiapas, Mexico',
      galleryX: 75,
      galleryY: 68,
      width: 140,
      height: 180,
      orientation: 'portrait'
    },
    {
      id: 7,
      src: 'images/about/IMG_4848.JPEG',
      caption: 'Iceland',
      galleryX: 15,
      galleryY: 78,
      width: 160,
      height: 120,
      orientation: 'landscape'
    },
    {
      id: 8,
      src: 'images/about/IMG_4970.JPEG',
      caption: 'I love Paris',
      galleryX: 27,
      galleryY: 78,
      width: 160,
      height: 120,
      orientation: 'landscape'
    },
    {
      id: 9,
      src: 'images/about/IMG_2222.JPG',
      caption: 'double shot latte',
      galleryX: 39,
      galleryY: 78,
      width: 140,
      height: 180,
      orientation: 'portrait'
    },
    {
      id: 10,
      src: 'images/about/IMG_1640.JPG',
      caption: 'happy place',
      galleryX: 51,
      galleryY: 78,
      width: 160,
      height: 120,
      orientation: 'landscape'
    },
    {
      id: 11,
      src: 'images/about/coffeesteel.JPEG',
      caption: 'a steel cafe in Paris',
      galleryX: 63,
      galleryY: 78,
      width: 140,
      height: 180,
      orientation: 'portrait'
    },
    {
      id: 12,
      src: 'images/about/IDG_20250720_144222_364.jpg',
      caption: 'Vancouver',
      galleryX: 75,
      galleryY: 78,
      width: 160,
      height: 120,
      orientation: 'landscape'
    }
  ];

  return (
    <>
      <style>
        {`
          @keyframes fallToGallery {
            0% { 
              transform: translateY(-150vh); 
              opacity: 0; 
            }
            10% {
              opacity: 1;
            }
            70% { 
              transform: translateY(10px); 
              opacity: 1; 
            }
            100% { 
              transform: translateY(0px); 
              opacity: 1; 
            }
          }
          
          .film-photo {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            animation: fallToGallery 3.5s ease-out both;
            user-select: none;
          }
          
          .film-photo:hover {
            transform: translateY(-8px) scale(1.03) !important;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3) !important;
            z-index: 100;
          }
        `}
      </style>
      
      <section 
        className="about-page" 
        style={{ 
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          paddingTop: '150px', 
          paddingBottom: '350px',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '130vh'
        }}
      >
        {/* Responsive Gallery Grid */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '75%',
          transform: 'translateX(-50%)',
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: '20px',
          width: 'min(90vw, 1100px)',
          maxWidth: '1100px',
          zIndex: 1
        }}>
          {filmPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="film-photo"
              style={{
                width: `${photo.width}px`,
                height: `${photo.height}px`,
                transform: 'rotate(0deg)',
                background: 'transparent',
                padding: '0px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: '2px',
                zIndex: selectedPhoto === photo.id ? 999 : 10 - index,
                animationDelay: `${index * 0.15}s`,
                justifySelf: 'center'
              }}
              onClick={() => setSelectedPhoto(selectedPhoto === photo.id ? null : photo.id)}
            >
              {/* Photo with frame */}
              <div style={{
                width: '100%',
                height: `${photo.height}px`,
                background: '#f8f8f8',
                marginBottom: '0px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img 
                  src={photo.src}
                  alt={photo.caption}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: selectedPhoto === photo.id 
                      ? 'sepia(25%) saturate(1.2) contrast(1.1) brightness(1.05) hue-rotate(5deg)' 
                      : 'grayscale(1) contrast(1.2) brightness(0.95)',
                    transition: 'filter 0.4s ease'
                  }}
                  onError={(e) => {
                    e.target.style.background = '#e5e5e5';
                    e.target.style.display = 'flex';
                    e.target.style.alignItems = 'center';
                    e.target.style.justifyContent = 'center';
                    e.target.textContent = '📷';
                    e.target.style.fontSize = '20px';
                    e.target.style.color = '#999';
                  }}
                />
              </div>
              
              {/* Gallery label overlay */}
              <p style={{
                position: 'absolute',
                bottom: '5px',
                left: '5px',
                margin: '0',
                fontSize: '9px',
                color: 'white',
                fontFamily: 'monospace',
                letterSpacing: '0.3px',
                textTransform: 'uppercase',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                background: 'rgba(0,0,0,0.4)',
                padding: '3px 6px',
                borderRadius: '2px'
              }}>
                {photo.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Enlarged Photo - gallery style */}
        {selectedPhoto && (
          <div 
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%) scale(1.8)',
              background: 'transparent',
              padding: '0px',
              borderRadius: '2px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4), 0 0 0 4px rgba(255, 255, 255, 0.95)',
              zIndex: 2000,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer'
            }}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
            onClick={() => setSelectedPhoto(null)}
          >
            {(() => {
              const photo = filmPhotos.find(p => p.id === selectedPhoto);
              return (
                <>
                  <div style={{
                    width: `${photo.width}px`,
                    height: `${photo.height}px`,
                    background: '#f8f8f8',
                    marginBottom: '0px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <img 
                      src={photo.src}
                      alt={photo.caption}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'sepia(30%) saturate(1.3) contrast(1.1) brightness(1.1) hue-rotate(8deg)'
                      }}
                    />
                    <p style={{
                      position: 'absolute',
                      bottom: '5px',
                      left: '5px',
                      margin: '0',
                      fontSize: '10px',
                      color: 'white',
                      fontFamily: 'monospace',
                      letterSpacing: '0.3px',
                      textTransform: 'uppercase',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                      background: 'rgba(0,0,0,0.4)',
                      padding: '3px 6px',
                      borderRadius: '2px'
                    }}>
                      {photo.caption}
                    </p>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 5 }}>
          
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <p style={{ fontSize: '18px', marginBottom: '10px', lineHeight: '1.6' }}>
              <strong>My name, Tanha (تنحى)</strong> — pronounced <em>(taan-haa)</em> — means "carving" in Arabic and mirrors the <code style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>tanh</code> (hyperbolic tangent of (a)) function.
            </p>
            
            <p style={{ fontSize: '16px', marginBottom: '10px', opacity: '0.9' }}>
              That dual meaning reflects how I work: structured yet intuitive, deeply analytical but always grounded in human-centered design.
            </p>
          </div>

          {/* Simple Timeline */}
          <div style={{ 
            position: 'relative', 
            paddingLeft: '40px', 
            marginBottom: '10px',
            maxWidth: '800px',
            margin: '0 auto 60px'
          }}>
            <div style={{
              position: 'absolute',
              left: '15px',
              top: '0',
              bottom: '0',
              width: '2px',
              background: 'currentColor',
              opacity: '0.3'
            }}></div>
            
            {[
              {
                title: 'High School',
                subtitle: 'Math was my first love.',
                content: 'I used to solve equations for fun and sketch whatever I saw around me—usually while scrolling Tumblr deep into the night.'
              },
              {
                title: 'Undergrad',
                subtitle: 'I studied art and technology',
                content: 'I explored creative tech projects that lived between mediums—coding installations, designing speculative tools, and studying how systems and people interact.'
              },
              {
                title: 'Grad School',
                subtitle: 'Architecture & Data Science era (barely slept)',
                content: 'I pivoted to architecture to bring more math and physics into my creative work. That curiosity very quickly expanded into data science — and then transformers dropped, and suddenly I was prototyping everything from spatial tools to AI-powered workflows.'
              },
              {
                title: 'Work',
                subtitle: 'Working across disciplines',
                content: 'I\'ve worked across disciplines—designing, analyzing, and building with teams at Google, JPMorgan Chase, The Bond Center, CUNY, and Flad. My projects have spanned everything from data platforms and digital workflows to ML-driven product experiences.'
              },
              {
                title: 'Bereavement Sabbatical',
                subtitle: 'Loss',
                content: 'A sudden cancer diagnosis and ultimately losing my mom shattered my world. I took some time to heal.'
              },
              {
                title: 'Now',
                subtitle: 'Persevered and returned to doing what I love!',
                content: 'I\'ve leaned fully into what I do best—crafting intuitive design systems powered by ML.'
              }
            ].map((item, index) => (
              <div key={index} style={{ 
                position: 'relative', 
                marginBottom: '35px',
                paddingBottom: '15px'
              }}>
                <div style={{
                  position: 'absolute',
                  left: '-32px',
                  top: '4px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: 'currentColor',
                  border: '3px solid currentColor'
                }}></div>
                
                <h2 style={{ 
                  fontSize: '20px', 
                  fontWeight: '700', 
                  marginBottom: '6px', 
                  color: 'inherit'
                }}>
                  {item.title}
                </h2>
                <p style={{ 
                  marginBottom: '8px', 
                  fontWeight: '600',
                  fontSize: '16px'
                }}>
                  {item.subtitle}
                </p>
                <p style={{ 
                  fontSize: '14px', 
                  opacity: '0.85',
                  lineHeight: '1.5'
                }}>
                  {item.content}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            textAlign: 'center',
            marginBottom: '40px',
            maxWidth: '800px',
            margin: '0 auto 40px'
          }}>
            
            <p style={{ fontSize: '16px', marginBottom: '15px', opacity: 0.7 }}>
              My mother's ambition, intelligence, kindness, and tenacity have deeply shaped my values and drive. 
              She remains the inspiration behind my pursuit of meaningful work.
            </p>
            <p style={{ fontSize: '16px' }}>
              Outside of work, I really enjoy traveling, fashion, food, photography, and tinkering with mechanical keyboards. 
              I really enjoy coffee — I'm currently experimenting with grind size and brew temperature.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

const VisualPage = () => {
  const visualProjects = [
    {
      id: 'follow-me-dania',
      title: 'Follow Me, Dania',
      type: 'album cover',
      description: 'Album cover design featuring bold typography and atmospheric visual elements.',
      category: 'visual-design-branding',
      className: 'art-project',
      imageData: '/images/visual/followme.png',
      externalLink: true
    },
    {
      id: 'self',
      title: 'Self Portrait',
      type: 'art, graphic design',
      description: 'Abstract.',
      category: 'art',
      className: 'art-project',
      imageData: '/images/visual/mecollage.jpg'
    },
    {
      id: 'hejaz-saudi',
      title: 'Hejaz, Kingdom of Saudi Arabia',
      type: 'branding, visual design, logo',
      description: 'Cultural branding project celebrating the heritage and identity of the Hejaz region.',
      category: 'visual-design-branding',
      className: 'branding-project',
      imageData: '/images/visual/hejaz.gif'
    },
    {
      id: 'nyc-commissioner',
      title: 'New York Commissioner Building',
      type: 'illustration, commission',
      description: 'Detailed architectural illustration capturing the historic character of NYC landmark.',
      category: 'illustration',
      className: 'illustration-project',
      imageData: '/images/visual/bldg.jpg'
    },
    {
      id: 'sheikhdallah-corp',
      title: 'Sheikhdallah Corp',
      type: 'graphic design, commission',
      description: 'Corporate identity and graphic design solutions for business branding needs.',
      category: 'graphic-design',
      className: 'graphic-project',
      imageData: '/images/visual/sheikhdallah_corp.jpg'
    },
    {
      id: 'jism-body-series',
      title: 'Jism, جسم (Body)',
      type: 'illustration, anatomy series',
      description: 'Anatomical illustration series exploring the human form through artistic interpretation.',
      category: 'illustration',
      className: 'art-project',
      imageData: '/images/visual/jism.jpg'
    },
    {
      id: 'arab-tech-collective',
      title: 'Arab Tech Collective',
      type: 'graphic design, logo, branding',
      description: 'Modern identity design for tech community bridging Arab culture and innovation.',
      category: 'graphic-design',
      className: 'branding-project',
      imageData: '/images/visual/atc.jpg'
    },
    {
      id: 'year-2050-festival',
      title: 'Year 2050, Film Festival',
      type: 'visual design, film poster, commission',
      description: 'Futuristic poster design commission capturing the essence of forward-thinking cinema.',
      category: 'visual-design-branding',
      className: 'poster-project',
      imageData: '/images/visual/year2050.png'
    }
  ];

  return (
    <section id="visual" className="projects">
      <div className="container">
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '80px',
          paddingTop: '50px'
        }}>
          <p style={{ 
            fontSize: '24px', 
            lineHeight: '1.4',
            marginBottom: '20px',
            color: 'inherit',
            maxWidth: '600px',
            margin: '0 auto 20px'
          }}>
            I work on all sorts of design: branding, illustration, event stationary + more.
          </p>

          <p style={{ 
            fontSize: '20px', 
            lineHeight: '1.4',
            color: 'inherit',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <strong>Got an idea? <a 
              href="mailto:hello@tanha.com" 
              style={{ 
                color: 'inherit', 
                textDecoration: 'underline',
                textDecorationColor: 'currentColor',
                textDecorationThickness: '2px',
                textUnderlineOffset: '4px'
              }}
            >
              Email me
            </a> and let's make it happen!</strong>
          </p>
        </div>
        
        <div className="projects-grid">
          {visualProjects.map(project => (
            <ProjectCard key={project.id} project={project} theme={{}} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactPage = () => (
  <section className="contact-page">
    <div className="container" style={{ paddingTop: '150px', paddingBottom: '100px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '18px', lineHeight: '1.6', color: 'inherit', opacity: '0.8', marginBottom: '50px' }}>
          I'm always interested in collaborating on projects that sit at the intersection of data, 
          design, and meaningful impact. Whether you're looking for data insights, product design, 
          or just want to chat about the latest in AI and UX.
        </p>
        
        <div style={{ 
          display: 'grid', 
          gap: '30px',
          marginBottom: '50px'
        }}>
          <div style={{ 
            padding: '30px', 
            background: 'rgba(255, 255, 255, 0.1)', 
            border: '1px solid rgba(255, 255, 255, 0.2)', 
            borderRadius: '12px' 
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: 'inherit' }}>
              Email
            </h3>
            <a href="mailto:hello@tanha.com" style={{ 
              fontSize: '16px', 
              color: 'inherit', 
              textDecoration: 'none',
              borderBottom: '1px solid currentColor',
              paddingBottom: '2px'
            }}>
              hello@tanha.com
            </a>
          </div>
          
          <div style={{ 
            padding: '30px', 
            background: 'rgba(255, 255, 255, 0.1)', 
            border: '1px solid rgba(255, 255, 255, 0.2)', 
            borderRadius: '12px' 
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: 'inherit' }}>
              LinkedIn
            </h3>
            <a href="https://linkedin.com/in/tanha" style={{ 
              fontSize: '16px', 
              color: 'inherit', 
              textDecoration: 'none',
              borderBottom: '1px solid currentColor',
              paddingBottom: '2px'
            }}>
              linkedin.com/in/tanha
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Portfolio = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [checkedFilters, setCheckedFilters] = useState({
    'product-design': true,
    'ai-ml': true,
    'data-visualization': true,
    'writing':true,
    'mobile-design': true,
    'spatial-geospatial': true,
    'human-computer-interaction': true,
    'data-analysis': true
  });

  React.useEffect(() => {
    window.currentPortfolio = { setCurrentPage };
    return () => {
      delete window.currentPortfolio;
    };
  }, [setCurrentPage]);

  const projects = [
    {
      id: 'model-pulse',
      title: 'Model Pulse',
      type: 'web app',
      description: 'Real-time monitoring and analytics dashboard for machine learning model performance.',
      category: 'product-design',
      className: 'web-project',
      imageData: '/images/model-pulse.jpg',
      externalLink: 'https://tanhata.github.io/modelpulse-v2/'
    },
    {
      id: 'mcp',
      title: 'Model Communication Protocol',
      type: 'product design',
      description: 'Comprehensive framework for AI model interactions and communication protocols.',
      category: 'product-design',
      className: 'design-project',
      imageData: '/images/mcp.gif'
    },
    
    {
      id: 'subliminal-learning',
      title: 'Subliminal Learning: When “Clean” Data Isn’t Clean',
      type: 'writing',
      description: 'Reflections on Anthropic’s July 2025 paper and what it means for AI safety & product design.',
      category: 'writing',
      className: 'ml-writing',
      imageData: '/images/subliminal.png',
      externalLink: 'https://talshe.substack.com/p/subliminal-learning-when-clean-data'
    },
    {
      id: 'art-critic',
      title: 'Art Critic',
      type: 'llm, machine learning',
      description: 'Large language model trained to analyze and critique visual art with contextual understanding.',
      category: 'ai-ml',
      className: 'ml-project',
      imageData: '/images/art-critic.gif',
      externalLink: 'https://github.com/tanhata/ArtCrit_Blip/tree/main'
    },
    {
      id: 'recursive-orbit',
      title: 'Recursive Orbit',
      type: 'data viz',
      description: 'Interactive data visualization exploring recursive patterns and orbital mechanics.',
      category: 'data-visualization',
      className: 'data-project',
      imageData: '/images/recursive-orbit.gif',
      externalLink: 'https://observablehq.com/@tanhas-canvas/recursive-orbit'
    },
    {
      id: 'green-spaces',
      title: 'Green Spaces',
      type: 'data analysis',
      description: 'Interactive analysis of urban park accessibility and environmental impact across major cities.',
      category: 'data-analysis',
      className: 'data-project',
      imageData: '/images/green_spaces.gif',
      externalLink: 'https://tanhata.github.io/Green-Spaces-in-NYC/'
    },
    {
      id: 'forma',
      title: 'FORMA',
      type: 'mobile design',
      description: 'Mobile application design focused on form and user experience optimization.',
      category: 'mobile-design',
      className: 'mobile-project',
      imageData: '/images/forma.jpg'
    },
    {
      id: 'muse',
      title: 'MUSE',
      type: 'mobile design (iOS)',
      description: 'iOS application design with focus on creative tools and user inspiration.',
      category: 'mobile-design',
      className: 'mobile-project',
      imageData: '/images/muse.gif'
    },
    {
      id: 'building-dreams',
      title: 'Building Dreams',
      type: 'llm, deep learning',
      description: 'Deep learning model for architectural design generation and optimization.',
      category: 'ai-ml',
      className: 'ml-project',
      imageData: '/images/building-dreams.gif',
      externalLink: 'https://github.com/tanhata/finetuning-dreambooth'
    },
    {
      id: 'bitlot',
      title: 'BitLot',
      type: 'data analysis',
      description: 'Comprehensive product analytics platform for data-driven decision making.',
      category: 'data-analysis',
      className: 'data-project',
      imageData: '/images/bitlot.gif',
      externalLink: 'https://drive.google.com/file/d/1xA02RVjg-bTAI-DFs1xzg0PV7-OURb8G/view?usp=sharing',
    },   
    {
      id: 'heating-loads',
      title: 'Heating Loads',
      type: 'machine learning',
      description: 'Predictive modeling for building heating load optimization and energy efficiency.',
      category: 'ai-ml',
      className: 'ml-project',
      imageData: '/images/heating-loads.gif',
      externalLink: 'https://colab.research.google.com/drive/1qw4iJjcNdQUgGYq_wglaRoQflFcMhDZr?authuser=3'
    },
    {
      id: 'living-computing',
      title: 'Living Computing',
      type: 'human computer interaction',
      description: 'Exploration of adaptive interfaces that respond to human behavior and context.',
      category: 'human-computer-interaction',
      className: 'design-project',
      imageData: '/images/living-computing.gif',
      externalLink: 'https://www.youtube.com/watch?v=Geo17VbvWtU'
    },
  ];

  const themes = {
    dark: {
      name: 'Ink',
      background: '#000000',
      text: '#ffffff',
      accent: '#ffffff',
      secondary: '#888',
      border: '#333',
      cardBg: '#1a1a1a',
      gradient: 'none'
    },
    light: {
      name: 'Pearl',
      background: '#ffffff',
      text: '#030202ff',
      accent: '#000000',
      secondary: '#666',
      border: '#e0e0e0',
      cardBg: '#f8f8f8',
      gradient: 'none'
    },
    gradient: {
      name: 'Rose',
      background: 'linear-gradient(135deg, #ff0000ff 0%, #ff0062ff 50%, #ff0000ff 100%)',
      text: '#ffffff',
      accent: '#ffffff',
      secondary: '#f0f0f0',
      border: '#ffffff',
      cardBg: 'rgba(255, 255, 255, 0.1)',
      gradient: 'linear-gradient(45deg, #ff0000ff, #ff0062ff, #ff0000ff )'
    }
  };

  const currentThemeConfig = themes[currentTheme];

  const handleFilterChange = (filterId) => {
    setCheckedFilters(prev => ({
      ...prev,
      [filterId]: !prev[filterId]
    }));
  };

  const filteredProjects = projects.filter(project => {
    return checkedFilters[project.category];
  });

  const isProjectPage = currentPage.startsWith('project-');
  const currentProject = isProjectPage ? projects.find(p => p.id === currentPage.replace('project-', '')) : null;

  const renderPage = () => {
    if (isProjectPage && currentProject) {
      return (
        <ProjectDetailPage 
          project={currentProject} 
          onBack={() => setCurrentPage('home')}
          theme={currentThemeConfig}
        />
      );
    }

    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'visual':
        return <VisualPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return (
          <>
            <section className="hero">
              <div className="container">
              <div className="profile-image-container">
                <img 
                  src={currentTheme === 'light' ? '/images/profile-light.gif' : '/images/profile-dark.gif'}
                  alt="Tanha profile"
                  style={{
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    border: '0px solid currentColor',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
              </div>
                  
                <h1 className="hero-title">I'm a Product Designer and Data Scientist based in New York City.</h1>
                <p className="hero-subtitle"></p>
                <p className="hero-description">
                I design from the inside out. I focus on turning AI driven systems into intuitive tools.
                </p>
                
                <div className="divider"></div>
              </div>
            </section>

            <section id="work" className="projects">
              <div className="container">
                <h2 style={{ 
                  fontSize: '48px', 
                  fontWeight: '700', 
                  marginBottom: '10px',
                  color: currentThemeConfig.text 
                }}>
                  Work
                </h2>
                 
                <div className="filters">
                  {[
                    { id: 'product-design', label: 'Product Design' },
                    { id: 'ai-ml', label: 'AI/ML' },
                    { id: 'data-visualization', label: 'Data Visualization' },
                    { id: 'data-analysis', label: 'Data Analysis' },
                    { id: 'writing', label: 'Writing/Research'},
                    { id: 'mobile-design', label: 'Mobile Design' },
                    { id: 'spatial-geospatial', label: 'Spatial/Geospatial' },
                    { id: 'human-computer-interaction', label: 'Human Computer Interaction' }
                  ].map(filter => (
                    <label key={filter.id} className="filter-item">
                      <input
                        type="checkbox"
                        checked={checkedFilters[filter.id]}
                        onChange={() => handleFilterChange(filter.id)}
                      />
                      <span>{filter.label}</span>
                    </label>
                  ))}
                </div>
                
                <div className="projects-grid">
                  {filteredProjects.map(project => (
                    <ProjectCard key={project.id} project={project} theme={currentThemeConfig} />
                  ))}
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div style={{ 
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: currentThemeConfig.background,
      color: currentThemeConfig.text,
      lineHeight: '1.6',
      margin: 0,
      padding: 0,
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    }}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .container {
          max-width: 100%;
          margin: 0 auto;
          padding: 0 40px;
        }

        header {
          position: fixed;
          top: 0;
          width: 100%;
          background: ${currentThemeConfig.background.includes('gradient') ? 'rgba(0, 0, 0, 0.8)' : currentThemeConfig.background === '#ffffff' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(10, 10, 10, 0.95)'};
          backdrop-filter: blur(10px);
          z-index: 1000;
          padding: 20px 0;
        }

        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .theme-switcher {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .theme-button {
          padding: 8px 12px;
          border: 2px solid ${currentThemeConfig.border};
          background: transparent;
          color: ${currentThemeConfig.text};
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .theme-button:hover, .theme-button.active {
          background: ${currentThemeConfig.accent};
          color: ${currentThemeConfig.background === '#ffffff' ? '#000' : currentThemeConfig.background.includes('gradient') ? '#000' : '#fff'};
        }

        .nav-links {
          display: flex;
          gap: 40px;
          list-style: none;
        }

        .nav-links a, .greeting-nav {
          color: ${currentThemeConfig.text};
          text-decoration: none;
          font-weight: 500;
          font-size: 16px;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
        }

        .nav-links a:hover, .greeting-nav:hover {
          color: ${currentThemeConfig.accent};
        }

        .nav-links a:hover::after, .greeting-nav:hover::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          right: 0;
          height: 2px;
          background: ${currentThemeConfig.gradient !== 'none' ? currentThemeConfig.gradient : currentThemeConfig.accent};
        }

        .hero {
          padding: 150px 0 100px;
          position: relative;
          text-align: center;
        }

        .profile-image-container {
          display: flex;
          justify-content: center;
          margin-bottom: 60px;
        }

        .hero-title {
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 15px;
          line-height: 1.1;
          text-align: right;
          color: ${currentThemeConfig.text};
        }

        .hero-subtitle {
          font-size: 30px;
          font-weight: 400;
          margin-bottom: 30px;
          opacity: 0.9;
          text-align: right;
          color: ${currentThemeConfig.secondary};
        }

        .hero-description {
          font-size: 30px;
          font-weight: 400;
          margin-bottom: 60px;
          text-align: right;
          color: ${currentThemeConfig.text};
        }

        .divider {
          width: 100%;
          height: 2px;
          background: ${currentThemeConfig.gradient !== 'none' ? currentThemeConfig.gradient : currentThemeConfig.border};
          margin: 80px 0;
          border-radius: 2px;
        }

        .projects {
          padding: 5px 0 100px;
        }

        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0;
          margin-bottom: 60px;
          max-width: none;
          margin-left: 0;
          margin-right: 0;
          padding: 0;
          justify-content: flex-start;
        }

        .filter-item {
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          font-size: 40px;
          color: ${currentThemeConfig.text};
          user-select: none;
          transition: all 0.3s ease;
          font-weight: 400;
          padding: 0;
          border-radius: 0;
          margin: 0 30px 30px 0;
          background: transparent;
          border: none;
          position: relative;
        }

        .filter-item input[type="checkbox"] {
          appearance: none;
          width: 36px;
          height: 36px;
          border: 3px solid ${currentThemeConfig.text};
          margin-right: 16px;
          position: relative;
          transition: all 0.3s ease;
          background: transparent;
          border-radius: 0;
          cursor: pointer;
        }

        .filter-item input[type="checkbox"]:checked {
          background: ${currentThemeConfig.text};
          border-color: ${currentThemeConfig.text};
        }

        .filter-item input[type="checkbox"]:checked::after {
          content: '';
          position: absolute;
          left: 6px;
          top: 2px;
          width: 12px;
          height: 20px;
          border: solid ${currentThemeConfig.background === '#ffffff' ? '#fff' : currentThemeConfig.background.includes('gradient') ? '#000' : currentThemeConfig.background};
          border-width: 0 4px 4px 0;
          transform: rotate(45deg);
        }

        .filter-item span {
          transition: color 0.3s ease;
          font-size: 40px;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          width: 100%;
        }

        .project {
          display: block;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          padding: 0 20px 20px 20px;
          cursor: pointer;
        }

        .project:hover {
          transform: translateY(-10px) scale(1.02);
        }

        .project-image {
          width: 100%;
          padding-bottom: 100%;
          background: ${currentThemeConfig.cardBg};
          border: 2px solid ${currentThemeConfig.border};
          border-radius: 12px;
          margin-bottom: 20px;
          overflow: hidden;
          position: relative;
          transition: all 0.3s ease;
        }

        .project-image img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          border-radius: 8px;
        }

        .external-link-indicator {
          position: absolute;
          top: 12px;
          right: 12px;
          background: ${currentThemeConfig.text};
          color: ${currentThemeConfig.background === '#ffffff' ? '#fff' : currentThemeConfig.background.includes('gradient') ? '#000' : currentThemeConfig.background};
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
          opacity: 0.9;
        }
        
        .project:hover .project-image {
          border-color: ${currentThemeConfig.accent};
        }

        .project-title {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 8px;
          color: ${currentThemeConfig.text};
          transition: color 0.3s ease;
        }

        .project:hover .project-title {
          color: ${currentThemeConfig.accent};
        }

        .project-type {
          font-size: 14px;
          color: ${currentThemeConfig.secondary};
          margin-bottom: 12px;
          transition: color 0.3s ease;
        }

        .project-description {
          font-size: 16px;
          color: ${currentThemeConfig.secondary};
          line-height: 1.5;
          transition: color 0.3s ease;
        }

        .project-detail {
          padding: 150px 0 100px;
          max-width: 1000px;
          margin: 0 auto;
          padding-left: 40px;
          padding-right: 40px;
        }

        .project-detail-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .back-button {
          background: transparent;
          border: 2px solid ${currentThemeConfig.text};
          color: ${currentThemeConfig.text};
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .back-button:hover {
          background: ${currentThemeConfig.text};
          color: ${currentThemeConfig.background === '#ffffff' ? '#fff' : currentThemeConfig.background.includes('gradient') ? '#000' : currentThemeConfig.background};
        }

        .project-detail-title {
          font-size: 64px;
          font-weight: 700;
          margin-bottom: 20px;
          color: ${currentThemeConfig.text};
          line-height: 1.1;
        }

        .project-detail-subtitle {
          font-size: 24px;
          color: ${currentThemeConfig.secondary};
          margin-bottom: 60px;
        }

        .project-hero-simple {
          text-align: left;
          margin-bottom: 60px;
          padding-bottom: 40px;
          border-bottom: 1px solid ${currentThemeConfig.border};
        }

        .project-meta-simple {
          margin-top: 30px;
          font-size: 16px;
          line-height: 1.6;
        }

        .project-meta-simple p {
          margin: 8px 0;
          color: ${currentThemeConfig.text};
          opacity: 0.9;
        }

        .project-content-simple {
          max-width: none;
          line-height: 1.7;
        }

        .content-paragraph {
          font-size: 18px;
          margin-bottom: 20px;
          color: ${currentThemeConfig.text};
          line-height: 1.7;
        }

        .content-heading {
          font-size: 28px;
          font-weight: 700;
          margin: 60px 0 30px 0;
          color: ${currentThemeConfig.text};
          line-height: 1.2;
        }

        .content-image {
          margin: 40px 0;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid ${currentThemeConfig.border};
        }

        .content-image img {
          width: 100%;
          height: auto;
          display: block;
        }

        .content-image-pair {
          margin: 40px 0;
        }

        .side-by-side-images {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          border-radius: 12px;
          overflow: hidden;
        }

        .side-by-side-images img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 8px;
          border: 1px solid ${currentThemeConfig.border};
        }

        @media (max-width: 768px) {
          .container, nav, .project-detail {
            padding: 0 20px;
          }

          .projects-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .side-by-side-images {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .filter-item {
            font-size: 32px;
            margin: 0 20px 20px 0;
          }

          .hero-title, .project-detail-title {
            font-size: 36px;
          }
        }
      `}</style>

      <header>
        <nav>
          <div className="theme-switcher">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                className={`theme-button ${currentTheme === key ? 'active' : ''}`}
                onClick={() => setCurrentTheme(key)}
              >
                {theme.name}
              </button>
            ))}
          </div>
          <ul className="nav-links">
            <li><a onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }} className="greeting-nav">hello سَلَام</a></li>
            <li><a onClick={(e) => { e.preventDefault(); setCurrentPage('about'); }}>about</a></li>
            <li><a onClick={(e) => { e.preventDefault(); setCurrentPage('visual'); }}>visual</a></li>
            <li><a onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }}>contact</a></li>
          </ul>
        </nav>
      </header>

      {renderPage()}
    </div>
  );
};

export default Portfolio;