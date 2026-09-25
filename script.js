const userProfiles = {
            profile_a: {
                name: "Rare Coder/Novice",
                "programming_experience": "Beginner",
                "coding_frequency": "Rarely / Monthly",
                "ide_familiarity": "Moderate / Not familiar",
                "preferred_assistance": "Balanced / Extensive",
                "primary_ai_purpose": "Explaining / Learning Concepts",
                ui_theme: "light-theme",
                panel_title: "💡 Guided Tutorial & Explanation Hub",
                panel_html: `
                    <p><strong>System Adaptation Active:</strong></p>
                    <ul style="padding-left: 15px; font-size: 11px; line-height: 1.4;">
                        <li><strong>Guidance Level:</strong> Step-by-step assistance & tutorials triggered.</li>
                        <li><strong>Assistance Pref:</strong> Extensive support & auto-formatting enabled.</li>
                        <li><strong>AI Mode:</strong> Defaults to "Explain Code" & learning concepts.</li>
                    </ul>
                    <p style="color: #005fb8; font-size: 10px;"><em>Behavior: Low familiarity triggers guided tutorial panels and syntax prompts.</em></p>
                `
            },
            profile_b: {
                name: "Profile B (Active Intermediate)",
                programming_experience: "Intermediate",
                coding_frequency: "Daily / Weekly",
                ide_familiarity: "Very / Extremely familiar",
                preferred_assistance: "Balanced / Minimal",
                primary_ai_purpose: "Generating / Fixing Errors",
                ui_theme: "dark-theme",
                panel_title: "⚙️ AI Assistant & Refactoring Hub",
                panel_html: `
                    <p><strong>System Adaptation Active:</strong></p>
                    <ul style="padding-left: 15px; font-size: 11px; line-height: 1.4;">
                        <li><strong>Guidance Level:</strong> Targeted debugging and concise suggestions.</li>
                        <li><strong>Assistance Pref:</strong> Quick fixes and productivity tools enabled.</li>
                        <li><strong>AI Mode:</strong> Defaults to "Generate Code" & "Fix Errors".</li>
                    </ul>
                    <p style="color: #4ec9b0; font-size: 10px;"><em>Behavior: High familiarity prioritizes direct feedback and workflow acceleration.</em></p>
                `
            }
};

let activeProfileId = "profile_a";

function loadProfile(profileId) {
    const profile = userProfiles[profileId];
    if (!profile) {
        return;
    }

    activeProfileId = profileId;
    document.body.className = profile.ui_theme;
    document.getElementById("panel-title").textContent = profile.panel_title;
    document.getElementById("panel-body").innerHTML = profile.panel_html;

    const inspector = document.getElementById("inspector-content");
    inspector.innerHTML = Object.entries(profile)
        .filter(([key]) => !["name", "ui_theme", "panel_title", "panel_html"].includes(key))
        .map(([key, value]) => `
            <div class="attr-row">
                <span class="attr-key">${key.replaceAll("_", " ")}</span>
                <span class="attr-val">${value}</span>
            </div>
        `)
        .join("");

    const isNoviceProfile = profileId === "profile_a";
    document.getElementById("format-button").style.display = isNoviceProfile ? "" : "none";
    document.getElementById("format-status-label").textContent =
        isNoviceProfile ? "Enabled (Novice)" : "Manual Control";
    renderTerminalOutput();
}

function renderTerminalOutput() {
    const output = [
        "[EXEC] Execution complete. No syntax errors detected.",
        "[AI_FIX] No fixes required."
    ];

    if (activeProfileId === "profile_a") {
        output.push(
            "[TUTORIAL] Step-by-step logic breakdown for beginners:",
            "1. Defining function: Create calculate_metrics to process the data.",
            "2. Summing up elements: Add all values in the data list.",
            "3. Calculating the average: Divide the total by the number of values.",
            "[FORMAT_NOVICE] Automatic formatting enabled."
        );
    } else {
        output.push("[FORMAT_INTERMEDIATE] Manual formatting control.");
    }

    document.getElementById("terminal-out").textContent = output.join("\n");
}

function runCodeTask() {
    renderTerminalOutput();
}

function triggerFormatting() {
    if (activeProfileId === "profile_a") {
        document.getElementById("terminal-out").textContent =
            "[EXEC] Formatting complete.\n[AI_FIX] No fixes required.\n[FORMAT_NOVICE] Automatic formatting applied.";
    }
}

document.addEventListener("DOMContentLoaded", () => loadProfile("profile_a"));
