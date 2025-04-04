// Store current navigation state
let currentState = {
    course: null,
    courseName: null,
    semester: null,
    resourceType: null,
    currentPdf: null,
    currentPdfTitle: null
};

// Add these state variables at the top with your existing state
let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// First, define shared resources with subject organization
const sharedResources = {
    'first-sem-notes': {
        'Engineering Mathematics I': [
            { 
                name: '2080 to 2076 Solutions',
                filename: 'https://drive.google.com/file/d/1qCkU4mX6tXZWh295I3cC8eNzkogLKRqh/preview'
            }
        ],
        'Engineering Physics I': [
            {
                name: 'Notes',
                filename: 'https://drive.google.com/file/d/1_mZ48UWlS205unZccU0rtTzGZ44Mn0DC/preview'
            },
            {
                name: '2080 to 2076 Solutions',
                filename: 'https://drive.google.com/file/d/10rtDo5O2dqUmO1iq4ASFdvZcWeNr1dK4/preview'
            }

        ],
        'Engineering Chemistry I': [
            {
                name: 'Notes',
                filename: 'https://drive.google.com/file/d/1t-mS43nBJZmlFbTcgNDnn6YQ2NxQV2q_/preview'
            },
            {
                name: '2080 to 2076 Solutions',
                filename: 'https://drive.google.com/file/d/1nAJWnMvb1ipME1Un0hf7XNPDBuhsGt-h/preview'
            }
        ],
        'Computer Application': [
            {
                name: '2081 to 2076 Solutions',
                filename: 'https://drive.google.com/file/d/1U5JPebevH1bjxZZLplxSHOw8bElrH-eG/preview'
            }
        ],
    },
    'first-sem-questions': {
        'Engineering Mathematics I': [
            {
                name: '2081 to 2076 Questions',
                filename: 'https://drive.google.com/file/d/1BsVnteZEX-bIcMiC25qhLJlekXifN2cz/preview'
            },
            {
                name: 'New Model Questions',
                filename: 'https://drive.google.com/file/d/1TlfjudgsH17QpN0LC_bGlcdcM1_APFEH/preview'
            }
        ],
        'Computer Application': [
            {
                name: '2081 to 2066 Questions',
                filename: 'https://drive.google.com/file/d/100iwaMK6wk7nS-ZLypfdO4P_CCkg-9XK/preview'
            }],
        'Engineering Physics I(New)': [
            {
                name: 'New Model Questions',
                filename: 'https://drive.google.com/file/d/1ujQJZcD2WAcIf1HUZYdudeQ6-0oGShQC/preview'
            },
            
            {
                name: '2079-2081 Questions',
                filename: 'https://drive.google.com/file/d/1w-LuYLhjj1i00YcPfp7hrfi3zI9SVj9N/preview'
            }

        ],
        'Engineering Physics I(Old)':[
            {
                name: '2076-2078 Questions',
                filename: 'https://drive.google.com/file/d/1Vz0enw2kh2pF3ygBLXfMTEtVe3eXheE1/preview'
            }
        ],
        'Engineering Chemistry I(New)': [
            {
                name: '2079-2081 Questions',
                filename: 'https://drive.google.com/file/d/1RlksVx30OzE6DMbudpq6QEhlJpGnNKof/preview'
            },
            {
                name: 'New Model Questions',
                filename: 'https://drive.google.com/file/d/1OSVK2fv8dwsRju2tSbD_iwPJrHAMFjWZ/preview'
            }
        ],
        'Engineering Chemistry I(Old)': [
            {
                name: '2075-2080 Questions',
                filename: 'https://drive.google.com/file/d/1GDNicci1JBGF69iEmim1fCGLy1TD0u5Q/preview'
            },

            {
                name: 'Question Bank',
                filename: 'https://drive.google.com/file/d/1D2MEkTL1LUVPvTdAS7qsSb0mO76AFqQY/preview'
            }
        ]
    },
   'second-sem-notes': {
        'Engineering Physics II': [
            {
             name: 'Notes',
             filename: 'https://drive.google.com/file/d/12lDPtRale4_2RtIAFaT2Wq1ZJVSoRFwh/preview'
            },
            {
             name: 'Important Notes',
             filename: 'https://drive.google.com/file/d/1CdR-mjkY4Lyhkg2BFGXcqxMTChchempX/preview'
            },
            {
                name: '2077-2081 Solutions',
                filename: 'https://drive.google.com/file/d/1VEg-m7jg6i5mrfm37fL0nDS9eNbrrMs9/preview'
            }
     ],
        'Engineering Mathematics II': [
            {
             name: '2077-2080 Solutions',
             filename: 'https://drive.google.com/file/d/16Ywp0-FCj0biwBEz-A6izO4KL5pYx8u7/preview'
            }
 ],
 'Engineering Chemistry II':[
    {
        name: 'Notes',
        filename: 'https://drive.google.com/file/d/1ybQSDue3VOGXOJGRVrqqshkhfJmHs2q5/preview'
    },
    {
        name: '2076-2081 Solutions',
        filename: 'https://drive.google.com/file/d/1EQg6QSIHKQ8F1q5_StBySoVk8lXE2zSk/preview'
    },
    {
        name: 'Important Notes',
        filename: 'https://drive.google.com/file/d/178DOOTSKeR8Bo9iq3udv6eeFgokLVgis/preview'
    }
 ],
 'Applied Mechanics':[
        {
            name: 'Notes',
            filename: 'https://drive.google.com/file/d/1pQ17pkDYnCEDpx3TIMz3frm3VRu4Jmug/preview'
        },
        {
            name: 'Notes 2',
            filename: 'https://drive.google.com/file/d/16ewjAp16Y-hLd7icDS4ABYmgOUJtx6PJ/preview'
        },
        {
            name: '2081-2078 Solutions',
            filename: 'https://drive.google.com/file/d/18Lmo3eUD7PYrFETMYHLzPOeImUJ6n0tK/preview'
        }
    ],
},
'second-sem-questions': {
    'Applied Mechanics': [
        {
            name: 'Set Questions',
            filename: 'https://drive.google.com/file/d/1m2rZYYm5CgwaNU2hd9E96qF42eL9QH23/preview'
        },
        {
            name: '2081-2078 Questions',
            filename: 'https://drive.google.com/file/d/1sI4E9_dU-AIc_2oAeoeZbwQOGOCZSudy/preview'
        }
    ],
    'Engineering Physics II':[
        {
            name: '2072-2079 Questions',
            filename: 'https://drive.google.com/file/d/1S_uaX8kP-KSLrqIhXjHypGIOUE2HBDhR/preview'
        },
        {
            name: '2081-2080 Questions',
            filename: 'https://drive.google.com/file/d/1lh4gpGgbbXZYdch6SAwogU46YgODGgew/preview'
        }
    ],
    'Engineering Chemistry II':[
        {
            name: '2071-2079 Questions',
            filename: 'https://drive.google.com/file/d/1YArgdoakv9hYmS6DjxAepzDTSpR_pyiE/preview'
        },
        {
            name: '2081-2080 Questions',
            filename: 'https://drive.google.com/file/d/1jczsRn-ZMARsVr_2TBONxFHbChxwQfMp/preview'
        }
    ],
    'Engineering Mathematics II':[
        {
            name: '2071-2079 Questions',
            filename: 'https://drive.google.com/file/d/1gAHN1QpMiNP16JhNSmL7ewVCY1Y0grBI/preview'
        },
        {
            name: '2081-2080 Questions',
            filename: 'https://drive.google.com/file/d/1-qGbchliFammX3tkTTNEGU1LGYtamUQW/preview'
        }
    ],
    
}
    };
// Then modify your resources object to reference shared resources
const resources = {
    
    // Other unique resources
    'dce-3-notes': {
    'Engineering Mathematics III':[
        {
            name: 'Set Solutions',
            filename: 'https://drive.google.com/file/d/1sUGQDTI7H34vP06ahHjhJCZ5gaf6Z7Qw/preview'
        },
        {
            name: '2081-2078 Solutions',
            filename: 'https://drive.google.com/file/d/1KQCtKcssDFelPo58lC2y0Y9jnwq0jlnL/preview'
        }
    ],
    'Building Material':[
        {
            name: 'Notes',
            filename: 'https://drive.google.com/file/d/1tfyGsdZiremhnYGxmZ-fTyInEmTOt7V-/preview'
        },
        {
            name: 'Important Theory',
            filename: 'https://drive.google.com/file/d/1ISNQ_wqzdP55uYefEbwJZZlHrfbdwOvr/preview'
        }
    ],
    'Engineering Material':[
        {
            name: 'Notes',
            filename: 'https://drive.google.com/file/d/1ua31MhMFeJwJUuj_caG5jJqwb9FkXyJ5/preview'
        },
        {
            name: 'Important Questions',
            filename: 'https://drive.google.com/file/d/1ACzeN0VotCBme6SbpH_SHNX9MHSCtP1P/preview'
        }
    ],
    'Fluid Mechanics and Hydraulics':[
        {
            name: 'Practical',
            filename: 'https://drive.google.com/file/d/15ebq29ds1zZb9H9T1TkGxinCh1miGfBq/preview'
        },
        {
            name: 'Notes',
            filename: 'https://drive.google.com/file/d/1wOm5sLGKwKNwwuEQjLjsVlomUM5x4L8i/preview'
        },
        {
            name: 'Important Questions & Numericals',
            filename: 'https://drive.google.com/file/d/1bM9OrwxmAA1tsFuc4P-NU3clB7Eu0MX0/preview'
        }
    ],
    'Surveying I':[
        {
            name: 'Notes',
            filename: 'https://drive.google.com/file/d/1KHgv86jdfeNSCXnm7rriW1fZY2R2kgXb/preview'
        },
        {
            name: 'Practical',
            filename: 'https://drive.google.com/file/d/1PgJBnrF3zRxaFQYlYZeJbF0GLlqwHkNG/preview'
        },
        {
            name: 'Numericals',
            filename: 'https://drive.google.com/file/d/1W0VN8-Hj5OtOEb2oEFkyAfpaetnp299b/preview'
        }
    ],
    'Applied Mechanics':[
        {
            name: 'Notes',
            filename: 'https://drive.google.com/file/d/1pQ17pkDYnCEDpx3TIMz3frm3VRu4Jmug/preview'
        },
        {
            name: 'Notes 2',
            filename: 'https://drive.google.com/file/d/16ewjAp16Y-hLd7icDS4ABYmgOUJtx6PJ/preview'
        },
        {
            name: '2081-2078 Solutions',
            filename: 'https://drive.google.com/file/d/18Lmo3eUD7PYrFETMYHLzPOeImUJ6n0tK/preview'
        }
    ],
    'Computer Aided Drafting':[
        {
            name: 'Notes',
            filename: 'https://drive.google.com/file/d/1yw1_AMHHy3-jDGiIpHz8G3KDGau0FIic/preview'
        },
        {
            name: 'Notes 2',
            filename: 'https://drive.google.com/file/d/1Qh1wAA-ksZDE13Nvp2xeSiFlY8DIYlYz/preview'
        },
        {
            name: 'Important Question Solutions',
            filename: 'https://drive.google.com/file/d/1ZuOT6XMmLt141yKHL7D5vLKTbdf-gKEk/preview'
        }
    ],
    'Basic Hydraulics':[
        {
            name: 'Notes',
            filename: 'https://drive.google.com/file/d/1wOm5sLGKwKNwwuEQjLjsVlomUM5x4L8i/preview'
        },
        {
            name: 'Important Questions & Numericals',
            filename: 'https://drive.google.com/file/d/1bM9OrwxmAA1tsFuc4P-NU3clB7Eu0MX0/preview'
        }
    ]
    },
    'dce-3-questions': {
        'Building Construction':[
            {
                name: 'Model Questions',
                filename: 'https://drive.google.com/file/d/13U10BJu02Lbq1N7nm9COjSJT6RiqG-2P/preview'
            },
            {
                name: '2081-2078 Questions',
                filename: 'https://drive.google.com/file/d/1v-ZQvWtRRrby0muGr8IHoR0UDMQAmHW-/preview'
            }
        ],
        'Engineering Mathematics III':[
            {
                name: '2081-2069 Questions',
                filename: 'https://drive.google.com/file/d/1OV0FDWlDVqO-43wuM6Lm0u0QGHsjlMUJ/preview'
            },
            {
                name: 'Model Questions',
                filename: 'https://drive.google.com/file/d/1gkiwkB1BH5UvS3baLbbEDIK7xvrTMWMu/preview'
            }
        ],
        'Surveying I':[
            {
                name: '2081-2078 Questions',
                filename: 'https://drive.google.com/file/d/1vO1wbDJTrI1BJ8UkQbrF6uUgAcfrwWnN/preview'
            }
        ],
        'Engineering Material':[
            {
                name: '2081-2073 Questions',
                filename: 'https://drive.google.com/file/d/1LZAbCe2RAIkZjXPMvcDkCMa54P6WMoU4/preview'
            }
        ],
        'Fluid Mechanics/Basic Hydraulics':[
            {
                name: '2081-2078 Questions',
                filename: 'https://drive.google.com/file/d/1jOGM0vr4ZUf_E4KK6mK99Fckb2-J7aNq/preview'
            }
        ],
        'Computer Aided Drafting':[
            {
                name: '2079,2078 Questions',
                filename: 'https://drive.google.com/file/d/17K7V2RoJsmMdO2A7OCmTXFjghFvKA-TS/preview'
            }
        ],
        'Applied Mechanics':[
            {
                name: 'Question Set',
                filename: 'https://drive.google.com/file/d/1m2rZYYm5CgwaNU2hd9E96qF42eL9QH23/preview'
            },
            {
                name: '2081-2078 Questions',
                filename: 'https://drive.google.com/file/d/1sI4E9_dU-AIc_2oAeoeZbwQOGOCZSudy/preview'
            }
            ]
    },
};

// Toggle between notice board and course navigation
function updateTopBar() {
    const noticeBoard = document.getElementById('notice-board');
    const courseNav = document.getElementById('course-nav');
    
    if (currentState.course) {
        // If course is selected, show course nav and hide notice board
        noticeBoard.style.display = 'none';
        courseNav.style.display = 'block';
        
        // Update active course in navigation
        const courseItems = document.querySelectorAll('.course-nav-item');
        courseItems.forEach(item => {
            if (item.getAttribute('data-course') === currentState.course) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    } else {
        // If on home page, show notice board and hide course nav
        noticeBoard.style.display = 'block';
        courseNav.style.display = 'none';
    }
}

// Update the showHomePage function
function showHomePage() {
    currentState = {
        course: null,
        courseName: null,
        semester: null,
        resourceType: null,
        currentPdf: null,
        currentPdfTitle: null
    };
    
    updateTopBar();
    updateBreadcrumb();
    
    document.getElementById('content-area').innerHTML = `
        <section class="content-section">
            <h2 class="section-title">CTEVT Section</h2>
            <div class="card-grid">
                <div class="card" onclick="toggleResultForm()">
                    <h3 class="card-title">Check Your Result</h3>
                    <p class="card-description">View your exam results</p>
                </div>
                <div class="card" onclick="window.open('https://itms.ctevt.org.np:5580/notices', '_blank')">
                    <h3 class="card-title">Notice Board</h3>
                    <p class="card-description">View latest notices and updates</p>
                </div>
                <div class="card" onclick="viewPdf('https://drive.google.com/file/d/1S1-QyCKOWN8FNPftUoLgWwlSctizBgsX/view?usp=drive_link', '2081/82 Academic Calendar')">
                    <h3 class="card-title">2081/82 Academic Calendar</h3>
                    <p class="card-description">View academic calendar</p>
                </div>
            </div>
        </section>

        <section class="content-section">
            <h2 class="section-title">Courses</h2>
            <div class="card-grid">
                <div class="card" onclick="showSemesters('dcom', 'Computer Engineering')">
                    <h3 class="card-title">Computer Engineering</h3>
                    <p class="card-description">Access notes and question papers</p>
                </div>
                <div class="card" onclick="showSemesters('it', 'Information Technology')">
                    <h3 class="card-title">Information Technology</h3>
                    <p class="card-description">Access notes and question papers</p>
                </div>
                <div class="card" onclick="showSemesters('dce', 'Civil Engineering')">
                    <h3 class="card-title">Civil Engineering</h3>
                    <p class="card-description">Access notes and question papers</p>
                </div>
                <div class="card" onclick="showSemesters('dee', 'Electrical Engineering')">
                    <h3 class="card-title">Electrical Engineering</h3>
                    <p class="card-description">Access notes and question papers</p>
                </div>
                <div class="card" onclick="showSemesters('dge', 'Geomatics Engineering')">
                    <h3 class="card-title">Geomatics Engineering</h3>
                    <p class="card-description">Access notes and question papers</p>
                </div>
                <div class="card" onclick="showSemesters('dar', 'Architecture Engineering')">
                    <h3 class="card-title">Architecture Engineering</h3>
                    <p class="card-description">Access notes and question papers</p>
                </div>
                <div class="card" onclick="showSemesters('dme', 'Mechanical Engineering')">
                    <h3 class="card-title">Mechanical Engineering</h3>
                    <p class="card-description">Access notes and question papers</p>
                </div>
            </div>
        </section>
    `;
}

// Show semesters for selected course
function showSemesters(courseId, courseName) {
    currentState.course = courseId;
    currentState.courseName = courseName;
    currentState.semester = null;
    currentState.resourceType = null;
    currentState.currentPdf = null;
    currentState.currentPdfTitle = null;
    
    updateTopBar();
    updateBreadcrumb();
    
    let semestersHTML = '';
    for (let i = 1; i <= 6; i++) {
        semestersHTML += `
            <div class="card" onclick="showResourceTypes('${i}')">
                <h3 class="card-title">Semester ${i}</h3>
            </div>
        `;
    }
    
    document.getElementById('content-area').innerHTML = `
        <div class="header-with-back">
            <a href="#" class="back-button" onclick="showHomePage()">
                ← Back to Courses
            </a>
            <h2 class="section-title">${courseName}</h2>
        </div>
        <h3 class="section-title">Select a Semester</h3>
        <div class="card-grid">
            ${semestersHTML}
        </div>
    `;
}

// Show resource types for selected semester
function showResourceTypes(semesterId) {
    currentState.semester = semesterId;
    currentState.resourceType = null;
    currentState.currentPdf = null;
    currentState.currentPdfTitle = null;
    
    updateBreadcrumb();
    
    document.getElementById('content-area').innerHTML = `
        <div class="header-with-back">
            <a href="#" class="back-button" onclick="showSemesters('${currentState.course}', '${currentState.courseName}')">
                ← Back to Semesters
            </a>
            <h2 class="section-title">${currentState.courseName} - Semester ${semesterId}</h2>
        </div>
        <h3 class="section-title">Select Resource Type</h3>
        <div class="card-grid">
            <div class="card resource-type-card" onclick="showResources('notes')">
                <div class="resource-icon">📝</div>
                <div>
                    <h3 class="card-title">Notes</h3>
                    <p class="card-description">Lecture notes and study materials</p>
                </div>
            </div>
            <div class="card resource-type-card" onclick="showResources('questions')">
                <div class="resource-icon">❓</div>
                <div>
                    <h3 class="card-title">Questions</h3>
                    <p class="card-description">Previous exam papers and practice questions</p>
                </div>
            </div>
        </div>
    `;
}

// Show resources for the selected type
function showResources(resourceType) {
currentState.resourceType = resourceType;
currentState.currentPdf = null;
currentState.currentPdfTitle = null;

updateBreadcrumb();

// Create the resource key
const resourceKey = `${currentState.course}-${currentState.semester}-${resourceType}`;

// Check semester
const isFirstSemester = currentState.semester === '1';
const isSecondSemester = currentState.semester === '2';

// Get resources based on semester
let resourceMap = resources[resourceKey] || {};
if (Object.keys(resourceMap).length === 0) {
    if (isFirstSemester) {
        const sharedKey = `first-sem-${resourceType}`;
        resourceMap = sharedResources[sharedKey] || {};
    } else if (isSecondSemester) {
        const sharedKey = `second-sem-${resourceType}`;
        resourceMap = sharedResources[sharedKey] || {};
    }
}

// Generate HTML
let resourcesHTML = '';
if (Object.keys(resourceMap).length === 0) {
    resourcesHTML = '<p class="no-resources">No resources available yet.</p>';
} else {
    resourcesHTML = '<div class="subject-resources">';
    for (const [subject, pdfs] of Object.entries(resourceMap)) {
        resourcesHTML += `
            <div class="subject-card">
                <div class="subject-header">
                    <h3 class="subject-title">${subject}</h3>
                    <div class="subject-count">${pdfs.length} ${pdfs.length === 1 ? 'file' : 'files'}</div>
                </div>
                <div class="pdf-list">
                    ${pdfs.map(pdf => `
                        <a href="#" class="pdf-link" onclick="viewPdf('${pdf.filename}', '${pdf.name}')">
                            <span class="pdf-icon">📄</span>
                            <span class="pdf-name">${pdf.name}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }
    resourcesHTML += '</div>';
}

// Update content area
document.getElementById('content-area').innerHTML = `
    <div class="header-with-back">
        <a href="#" class="back-button" onclick="showResourceTypes('${currentState.semester}')">
            ← Back to Resources
        </a>
        <h2 class="section-title">${currentState.courseName} - Semester ${currentState.semester} - ${resourceType.charAt(0).toUpperCase() + resourceType.slice(1)}</h2>
    </div>
    ${resourcesHTML}
`;
}

// View PDF with Google Drive viewer
function viewPdf(pdfPath, title) {
    currentState.currentPdf = pdfPath;
    currentState.currentPdfTitle = title;

    updateBreadcrumb();

    const fileId = pdfPath.split('/d/')[1].split('/')[0];
    const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    // Check if this is the academic calendar
    const isCalendar = title === '2081/82 Academic Calendar';
    const backButtonText = isCalendar ? 'Back to Home' : 'Back to Resources';
    const backButtonAction = isCalendar ? 'showHomePage()' : `showResources('${currentState.resourceType}')`;

    // Check if bookmarked
    const isBookmarked = bookmarks.some(b => b.path === pdfPath);

    // Create single toolbar with all buttons
    document.getElementById('content-area').innerHTML = `
        <div class="header-with-back">
            <a href="#" class="back-button" onclick="${backButtonAction}">
                ← ${backButtonText}
            </a>
            <h2 class="section-title">${title}</h2>
        </div>
        <div class="pdf-viewer-toolbar">
            <button class="pdf-btn" onclick="downloadPdf('${downloadUrl}')">
                <svg class="btn-icon"><use href="#icon-download"/></svg>
                <span>Download</span>
            </button>
            <button class="pdf-btn" onclick="toggleFullscreen(this.parentElement.nextElementSibling)">
                <svg class="btn-icon"><use href="#icon-fullscreen"/></svg>
                <span class="fullscreen-text">Fullscreen</span>
            </button>
            <button class="pdf-btn ${isBookmarked ? 'active' : ''}" onclick="toggleBookmark('${pdfPath}', '${title}')">
                <svg class="btn-icon">
                    <use href="#icon-${isBookmarked ? 'bookmark-filled' : 'bookmark'}"/>
                </svg>
                <span>${isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>
        </div>
        <div class="pdf-container" id="pdfContainer">
            <div class="popout-overlay"></div>
            <iframe 
                allowfullscreen="allowfullscreen"
                frameborder="0"
                height="620px"
                scrolling="no"
                seamless=""
                src="${embedUrl}"
                width="100%">
            </iframe>
        </div>
    `;

    return false;
}

// Add this function after the viewPdf function
function toggleFullscreen(container) {
if (!document.fullscreenElement && 
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement) {
    // Enter fullscreen
    if (container.requestFullscreen) {
        container.requestFullscreen();
    } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
    } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
    } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
    }
    
    // Update button text
    document.querySelector('.fullscreen-text').textContent = 'Exit Fullscreen';
} else {
    // Exit fullscreen
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    
    // Update button text
    document.querySelector('.fullscreen-text').textContent = 'Fullscreen';
}
}

// Add fullscreen change event listener
document.addEventListener('fullscreenchange', updateFullscreenButtonText);
document.addEventListener('webkitfullscreenchange', updateFullscreenButtonText);
document.addEventListener('mozfullscreenchange', updateFullscreenButtonText);
document.addEventListener('MSFullscreenChange', updateFullscreenButtonText);

function updateFullscreenButtonText() {
const fullscreenText = document.querySelector('.fullscreen-text');
if (fullscreenText) {
    fullscreenText.textContent = document.fullscreenElement ? 'Exit Fullscreen' : 'Fullscreen';
}
}

// Add these helper functions
function handleIframeLoad(iframe) {
    // Check if the iframe loaded successfully
    try {
        // Try to access iframe content
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDoc.body.innerHTML === '') {
            handleIframeError(iframe);
        }
    } catch (e) {
        // If we can't access iframe content, it might be due to CORS
        console.log('PDF viewer loaded, but content may be restricted');
    }
}

function handleIframeError(iframe) {
    // Replace iframe with error message and direct link
    const container = iframe.parentElement;
    container.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <p style="margin-bottom: 1rem;">Unable to preview this PDF. You can:</p>
            <a href="${iframe.src.split('url=')[1].split('&')[0]}" 
               class="pdf-btn" 
               style="display: inline-block; margin: 0.5rem;"
               target="_blank">
               Open PDF Directly
            </a>
        </div>
    `;
}

// Update breadcrumb based on current state
function updateBreadcrumb() {
    let breadcrumbHTML = `<a href="#" onclick="showHomePage()">Home</a>`;
    
    if (currentState.course) {
        breadcrumbHTML += `
            <span>›</span>
            <a href="#" onclick="showSemesters('${currentState.course}', '${currentState.courseName}')">${currentState.courseName}</a>
        `;
        
        if (currentState.semester) {
            breadcrumbHTML += `
                <span>›</span>
                <a href="#" onclick="showResourceTypes('${currentState.semester}')">Semester ${currentState.semester}</a>
            `;
            
            if (currentState.resourceType) {
                const resourceTypeCapitalized = currentState.resourceType.charAt(0).toUpperCase() + currentState.resourceType.slice(1);
                breadcrumbHTML += `
                    <span>›</span>
                    <a href="#" onclick="showResources('${currentState.resourceType}')">${resourceTypeCapitalized}</a>
                `;
                
                if (currentState.currentPdf) {
                    breadcrumbHTML += `
                        <span>›</span>
                        <span>${currentState.currentPdfTitle}</span>
                    `;
                }
            }
        }
    }
    
    document.getElementById('breadcrumb').innerHTML = breadcrumbHTML;
}

function initPortal() {
    showHomePage();
    
    // Disable browser's native PDF viewer
    if (navigator.plugins && navigator.plugins['Chrome PDF Viewer']) {
        navigator.plugins['Chrome PDF Viewer'].enabled = false;
    }
}
// Update the toggleResultForm function
function toggleResultForm() {
currentState = {
    course: null,
    courseName: null,
    semester: null,
    resourceType: null,
    currentPdf: null,
    currentPdfTitle: null
};

updateTopBar();
updateBreadcrumb();

document.getElementById('content-area').innerHTML = `
    <div class="header-with-back">
        <a href="#" class="back-button" onclick="showHomePage()">
            ← Back to Home
        </a>
        <h2 class="section-title">Check Your Result</h2>
    </div>
    <div class="result-form-wrapper">
        <form action="https://itms.ctevt.org.np:5580/search_results" 
              method="POST" 
              target="_blank" 
              id="frmCheckResults" 
              name="frmCheckResults" 
              autocomplete="off"
              onsubmit="return validateAndSubmit(event)">
            <div class="row">
                <label class="col-lg-3 control-label">Examination Year:</label>
                <div class="col-lg-3">
                    <select class="form-control" id="src_year" name="src_year" required>
                        <option value="">-- Select --</option>
                        <option value="2081">2081</option>
                        <option value="2080">2080</option>
                        <option value="2079">2079</option>
                        <option value="2078">2078</option>
                        <option value="2077">2077</option>
                        <option value="2076">2076</option>
                        <option value="2075">2075</option>
                        <option value="2074">2074</option>
                        <option value="2073">2073</option>
                        <option value="2072">2072</option>
                        <option value="2071">2071</option>
                        <option value="2070">2070</option>
                    </select>
                </div>
            </div>
            <br>
            <div class="row">
                <label class="col-lg-3 control-label">Level:</label>
                <div class="col-lg-3">
                    <select name="src_level" id="src_level" class="form-control" required>
                        <option value="">-- Select --</option>
                        <option value="2">Pre-diploma</option>
                        <option value="3">Diploma/PCL</option>
                    </select>
                </div>
            </div>
            <br>
            <div class="row">
                <label class="col-lg-3 control-label">Symbol Number:</label>
                <div class="col-lg-5">
                    <input type="text" name="exam_symbol_number" id="exam_symbol_number" class="form-control" placeholder="e.g. 1000234" required>
                </div>
            </div>
            <br>
            <div class="row">
                <label class="col-lg-3 control-label">Date of Birth (B.S.):</label>
                <div class="col-lg-5">
                    <input type="text" name="dob" id="dob" placeholder="Date Format: YYYY-MM-DD" class="form-control" required>
                </div>
            </div>
            <br>
            <div class="col-lg-12 text-center">
                <input type="submit" name="submit" value="Search" class="btn btn-primary">
            </div>
        </form>
    </div>
`;
}

// Dark mode toggle
function initDarkMode() {
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.querySelector('#darkModeToggle i').className = 'fas fa-sun';
    }
    
    document.getElementById('darkModeToggle').addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('darkMode', isDarkMode);
        const icon = document.querySelector('#darkModeToggle i');
        icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    });
}

// Update the search functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        // Get card grid
        const cardGrid = document.querySelector('.card-grid');
        
        // Clear existing search results if search is empty
        if (!searchTerm) {
            document.querySelectorAll('.search-result').forEach(el => el.remove());
            document.querySelectorAll('.card').forEach(card => card.style.display = '');
            return;
        }
        
        // Hide all course cards during search
        document.querySelectorAll('.card').forEach(card => card.style.display = 'none');
        
        // Remove old search results
        document.querySelectorAll('.search-result').forEach(el => el.remove());
        
        // Search through all resources to find matches
        const searchResults = [];
        
        // Search in first semester resources
        for (const type of ['notes', 'questions']) {
            const resources = sharedResources[`first-sem-${type}`] || {};
            for (const [subject, pdfs] of Object.entries(resources)) {
                if (subject.toLowerCase().includes(searchTerm)) {
                    searchResults.push({
                        subject,
                        semester: '1st',
                        type,
                        availability: 'Available in 1st Semester (All Courses)'
                    });
                }
            }
        }
        
        // Search in second semester resources
        for (const type of ['notes', 'questions']) {
            const resources = sharedResources[`second-sem-${type}`] || {};
            for (const [subject, pdfs] of Object.entries(resources)) {
                if (subject.toLowerCase().includes(searchTerm)) {
                    searchResults.push({
                        subject,
                        semester: '2nd',
                        type,
                        availability: 'Available in 2nd Semester (All Courses)'
                    });
                }
            }
        }

        // Search in specific course resources
        Object.keys(resources).forEach(key => {
            const [course, sem, type] = key.split('-');
            const resourceList = resources[key] || {};
            
            for (const [subject, pdfs] of Object.entries(resourceList)) {
                if (subject.toLowerCase().includes(searchTerm)) {
                    const courseName = {
                        'dcom': 'Computer Engineering',
                        'it': 'Information Technology',
                        'dce': 'Civil Engineering',
                        'dee': 'Electrical Engineering',
                        'dge': 'Geomatics Engineering',
                        'dar': 'Architecture Engineering',
                        'dme': 'Mechanical Engineering'
                    }[course];

                    searchResults.push({
                        subject,
                        semester: sem,
                        type,
                        course,
                        courseName,
                        availability: `Available in ${courseName} (${sem}rd Semester)`
                    });
                }
            }
        });

        // Display search results
        if (searchResults.length > 0) {
            searchResults.forEach(result => {
                const div = document.createElement('div');
                div.className = 'card search-result';
                div.onclick = () => {
                    if (result.course) {
                        // For specific course resources
                        showSemesters(result.course, result.courseName);
                        setTimeout(() => {
                            showResourceTypes(result.semester);
                            setTimeout(() => {
                                showResources(result.type);
                            }, 100);
                        }, 100);
                    } else {
                        // For shared resources (1st and 2nd semester)
                        const availableCourses = document.querySelectorAll('.card:not(.search-result)')[0];
                        availableCourses.click();
                        setTimeout(() => {
                            showResourceTypes(result.semester === '1st' ? '1' : '2');
                            setTimeout(() => {
                                showResources(result.type);
                            }, 100);
                        }, 100);
                    }
                };
                
                div.innerHTML = `
                    <h3 class="card-title">${highlightText(result.subject, searchTerm)}</h3>
                    <p class="card-description">${result.availability}</p>
                `;
                cardGrid.appendChild(div);
            });
        } else {
            const noResults = document.createElement('div');
            noResults.className = 'card search-result';
            noResults.innerHTML = `
                <h3 class="card-title">No results found</h3>
                <p class="card-description">Try a different search term</p>
            `;
            cardGrid.appendChild(noResults);
        }
    });
}

function highlightText(text, searchTerm) {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Loading animation
function showLoading() {
    document.getElementById('loadingOverlay').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingOverlay').style.display = 'none';
}

// Bookmarking system
function toggleBookmark(pdfPath, title) {
    const index = bookmarks.findIndex(b => b.path === pdfPath);
    const bookmarkBtn = document.querySelector(`[onclick="toggleBookmark('${pdfPath}', '${title}')"]`);
    
    if (index === -1) {
        bookmarks.push({ path: pdfPath, title: title });
        bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i> Bookmarked';
        bookmarkBtn.classList.add('active');
        showNotification('Resource bookmarked');
    } else {
        bookmarks.splice(index, 1);
        bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i> Bookmark';
        bookmarkBtn.classList.remove('active');
        showNotification('Bookmark removed');
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    updateBookmarksList();
}

function updateBookmarksList() {
    const bookmarksList = document.getElementById('bookmarksList');
    if (!bookmarksList) return;
    
    bookmarksList.innerHTML = bookmarks.map(bookmark => `
        <div class="bookmark-item" onclick="viewPdf('${bookmark.path}', '${bookmark.title}')">
            <i class="fas fa-file-pdf"></i>
            <span>${bookmark.title}</span>
            <button class="remove-bookmark" onclick="event.stopPropagation(); toggleBookmark('${bookmark.path}', '${bookmark.title}')">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add loading to navigation actions
function wrapWithLoading(fn) {
    return async function(...args) {
        showLoading();
        try {
            await fn.apply(this, args);
        } finally {
            setTimeout(hideLoading, 300); // Add slight delay for smoother transitions
        }
    };
}

// Wrap navigation functions with loading
showHomePage = wrapWithLoading(showHomePage);
showSemesters = wrapWithLoading(showSemesters);
showResourceTypes = wrapWithLoading(showResourceTypes);
showResources = wrapWithLoading(showResources);

// Initialize features
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initSearch();
    updateBookmarksList();
    
    // Add bookmarks panel toggle
    document.querySelector('.close-bookmarks').addEventListener('click', () => {
        document.getElementById('bookmarksPanel').classList.remove('open');
    });
    
    // Add bookmark button to header if needed
    const headerControls = document.querySelector('.header-controls');
    const bookmarkToggle = document.createElement('button');
    bookmarkToggle.className = 'theme-toggle';
    bookmarkToggle.innerHTML = '<i class="fas fa-bookmark"></i>';
    bookmarkToggle.addEventListener('click', () => {
        document.getElementById('bookmarksPanel').classList.toggle('open');
    });
    headerControls.appendChild(bookmarkToggle);
});

// Initialize when the page loads
window.onload = initPortal;

// Add this function for download handling
function downloadPdf(url) {
    window.open(url, '_blank');
}