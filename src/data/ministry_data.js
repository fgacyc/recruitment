export const ministry_team_dept = {
    "people_experience": {
        "people": [
            "usher",
            "security"
        ],
        "operations": [
            "admin",
            "venue",
            "guest lounge",
            "shuttle"
        ],
        "technology": [
            "software development",
            "project management"
        ]
    },
    "communication": {
        "social_media": [
            "content creation",
            "editorial"
        ],
        "design": [
            "graphic design",
            "ui/ux design"
        ],
        "photography": [
            "photography"
        ]
    },
    "creative": {
        "production": [
            "stage management",
            "multimedia",
            "sound",
            "lighting",
            "translation"
        ],
        "arts": [
            "dance",
            "fashion&image",
            "drama",
            "decoration"
        ],
        "worship": [
            "vocal",
            "musician"
        ]
    },
    "wonderkids": {
        "wonderkids": [
            "children minister"
        ]
    }
}
export function getDepartment() {
    return Object.keys(ministry_team_dept)
}

export function getMinistryTeamDept() {
    const depts = Object.values(ministry_team_dept);
    let department = {};
    for (const dept of depts){
        Object.assign(department, dept)
    }
    return department
}

