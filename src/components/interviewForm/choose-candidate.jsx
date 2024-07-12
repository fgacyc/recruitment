import {useEffect, useState} from "react";
import {getMinistryTeamDept} from "../../data/ministry_data.js";
import Block from "./block.jsx";
import {useNavigate} from "react-router-dom";

function capitalizeAllWords(str) {
    str = str.replace(/_/g, " ");
    return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}

export default function ChooseCandidate() {
    const [department, setDepartment] = useState("");
    const [ministriesOptions, setMinistriesOptions] = useState([]);
    const [ministry, setMinistry] = useState("");
    const [candidateList,  setCandidateList] = useState([]);
    const [candidateID, setCandidateID] = useState("");
    const MinistryTeamDept = getMinistryTeamDept()
    const navigate = useNavigate();
    const [showloading, setShowLoading] = useState(false);



    useEffect(() => {
        // enter password
        const PASSWORD = "CYC2024"
        const password = localStorage.getItem("password")
        if(password !== PASSWORD){
            const password = prompt("Enter password")
            if (password !== PASSWORD){
                navigate("/")
            }else{
                localStorage.setItem("password", password)
            }
        }

        const selected = localStorage.getItem("cyc-recruitment-interview-selected")
        if (selected){
            const selectedData = JSON.parse(selected)
            setDepartment(selectedData.department)
            setMinistry(selectedData.ministry)
        }
    }, []);

    useEffect(() => {
        if (department) {
            setMinistriesOptions(MinistryTeamDept[department])
        }
    }, [MinistryTeamDept, department]);

    useEffect(() => {
        if (!ministry) {
            return
        }
        setShowLoading(true)
        async function fetchCandidates() {
            const url = `https://recruitment-api.fgacyc.com/candidate/${ministry}`
            const response = await fetch(url)
            const data = await response.json()
            // console.log(data)
            if(data.status){
                setCandidateList(data.data)
                setShowLoading(false)
            }

        }
        void fetchCandidates()
    }, [ministry]);


    function startInterview() {
        if (!department){
            alert("Please select department")
            return
        }

        if (!ministry){
            alert("Please select ministry")
            return
        }

        if (!candidateID){
            alert("Please select candidate")
            return
        }

        const selectedCandidate = candidateList.find(c => c.id === parseInt(candidateID))
        console.log(selectedCandidate)

        localStorage.setItem("cyc-recruitment-interview-selected", JSON.stringify({
            department,
            ministry,
            name : selectedCandidate.name,
            email : selectedCandidate.email,
            phone : selectedCandidate.phone,
        }))

        navigate("/interview-form")
    }

    return (
        <div style={{
            color : "black",
            padding: "1rem 3rem",
        }}>
            <div style={{
                textAlign: 'center', fontWeight: 'bold', fontSize: '1rem' ,margin:"1rem 0", fontFamily:"SF Pro Display",
            }}>Ministry Recruitment Interview</div>
            <div style={{
                textAlign: 'center',
                marginTop: "80px"
            }}>
                <div style={{
                    fontStyle: 'normal', fontSize: '2rem', fontFamily:"FZChaoCuHei",
                }}>一起建造</div>
                <div style={{
                    fontStyle: 'normal', fontSize: '2rem', fontFamily:"FZChaoCuHei",
                }}>属于我们的家</div>
                <div style={{
                    marginBottom: "80px",
                    fontWeight: "bold",
                    fontFamily:"SF Pro Display",
                    fontSize: "14px",
                    marginTop: "10px"
                }}>LET’S BUILD THIS HOME TOGETHER</div>
            </div>

            <Block title={"Department"}>
                <select
                    className="submission-select"
                    name="pastoral_team"
                    id="pastoral_team"
                    style={{marginTop: 0}}
                    value={department}
                    onChange={(e) => {
                        setDepartment(e.target.value)
                    }}
                >
                    <option value="">Select department</option>
                    {
                        Object.keys(MinistryTeamDept).map((deptName, index) => {
                            return (
                                <option key={index} value={deptName}>{capitalizeAllWords(deptName)}</option>
                            )
                        })
                    }
                </select>
            </Block>

            <Block title={"Ministry"}>
                <select
                    className="submission-select"
                    name="pastoral_team"
                    id="pastoral_team"
                    style={{marginTop: 0}}
                    value={ministry}
                    onChange={(e) => {
                        setMinistry(e.target.value)
                    }}
                >
                    <option value="">Select ministry</option>
                    {
                        ministriesOptions.map((ministry, index) => {
                            return (
                                <option key={index} value={ministry}>{capitalizeAllWords(ministry)}</option>
                            )
                        })
                    }
                </select>
            </Block>


            <Block title={"Candidate"} showloading={showloading}>
                <select
                    className="submission-select"
                    name="pastoral_team"
                    id="pastoral_team"
                    style={{marginTop: 0}}
                    // value={candidateID}
                    onChange={(e) => {
                        setCandidateID(e.target.value)
                    }}
                >
                    <option value="">Select candidate</option>
                    {
                        candidateList.length > 0 && candidateList.map((candidate, index) => {
                            return (
                                <option key={index} value={candidate.id}>{candidate.name}</option>
                            )
                        })
                    }
                </select>
            </Block>


            <button
                style={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "15px 0",
                    borderRadius: "30px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.125rem",
                    width: "100%",
                    marginTop: "20px",
                    fontWeight: "bold"
                }}
                onClick={startInterview}
            >
                Start Interview
            </button>
        </div>

    )
}