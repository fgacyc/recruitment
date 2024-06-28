export const organization_structure = {
    "people_experience": {
        "people": [
            "usher",
            "security"
        ],
        "general_affair": [
            "admin",
            "venue",
            "shuttle",
            "guest lounge"
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
            "multimedia design",
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

const department_color ={
    "people_experience": "#193A66",
    "communication": "#336397",
    "creative": "#00BB9E",
    "wonderkids": "#E46E48"
}

const ministry_name_map ={
    "usher": {
        "en": "Usher",
        "cn": "接待"
    },
    "security": {
        "en": "Security",
        "cn": "保安"
    },
    "admin": {
        "en": "Admin",
        "cn": "行政"
    },
    "lounge": {
        "en": "Lounge",
        "cn": "膳食"
    },
    "guest lounge":{
        "en": "Guest Lounge",
        "cn": "贵宾招待"
    },
    "venue": {
        "en": "Venue",
        "cn": "场地"
    },
    "shuttle": {
        "en": "Shuttle",
        "cn": "接驳服务"
    },
    "software development": {
        "en": "Software Development",
        "cn": "软件开发"
    },
    "project management": {
        "en": "Project Management",
        "cn": "项目管理"
    },
    "content creation": {
        "en": "Content Creation",
        "cn": "内容创作"
    },
    "editorial": {
        "en": "Editorial",
        "cn": "文字编辑"
    },
    "graphic design": {
        "en": "Graphic Design",
        "cn": "平面设计"
    },
    "multimedia design": {
        "en": "Multimedia Design",
        "cn": "网页设计"
    },
    "ui/ux design": {
        "en": "UI/UX Design",
        "cn": "网页设计"
    },
    "photography": {
        "en": "Photography",
        "cn": "摄影"
    },
    "stage management": {
        "en": "Stage Management",
        "cn": "舞台监督"
    },
    "multimedia": {
        "en": "Multimedia",
        "cn": "多媒体"
    },
    "sound": {
        "en": "Sound",
        "cn": "音响"
    },
    "lighting": {
        "en": "Lighting",
        "cn": "灯光"
    },
    "translation": {
        "en": "Translation",
        "cn": "语言翻译"
    },
    "dance": {
        "en": "Dance",
        "cn": "舞蹈"
    },
    "fashion&image": {
        "en": "Fashion & Image",
        "cn": "形象设计"
    },
    "drama": {
        "en": "Drama",
        "cn": "戏剧"
    },
    "vocal": {
        "en": "Vocal",
        "cn": "主唱"
    },
    "musician": {
        "en": "Musician",
        "cn": "乐手"
    },
    "children minister": {
        "en": "Children Minister",
        "cn": "神奇王国同工"
    }
    ,"decoration":{
        "en": "Decoration",
        "cn": "视觉陈列"
    }
}

export function findMinistry(name){
    // return team name, department name, ministry name
    if (name ==="fashion & image") return ["creative", "arts", "fashion&image"];
    name = name.toLowerCase();

    // console.log("name11", name)

    let ministry = "";
    let department = "";
    let team = "";
    for (let key in organization_structure) {
        for (let subkey in organization_structure[key]) {
            for (let subsubkey in organization_structure[key][subkey]) {
                if (organization_structure[key][subkey][subsubkey] === name) {
                    team= key;
                    department = subkey;
                    ministry = name;
                    break;
                }
            }
        }
    }
    // console.log("ministry",ministry)
    return [team, department, ministry];
}


export function findMinistryColor(name){
    let team = findMinistry(name)[0];
    return department_color[team];
}

export function findMinistryName(name){
    // console.log("name", name)
    let ministry = findMinistry(name)[2];
    return ministry_name_map[ministry];
}