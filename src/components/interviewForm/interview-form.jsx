import {useEffect, useState} from "react";
import {RadioGroup} from "./radio-group.jsx";
import QuestionTextarea from "./question-textarea.jsx";
import QuestionBlock from "./question-block.jsx";
import {confirmAlert} from "react-confirm-alert";
import {useNavigate} from "react-router-dom";




export default function InterviewForm() {
    const [department, setDepartment] = useState("");
    const [ministry, setMinistry] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");


    const [candidate, setCandidate] = useState("");
    const [committedTime, setCommittedTime] = useState("");
    const durations = [
        'Below 3 months' ,'Below 1 year' ,'1 year and above' ,'3 years and above'
    ]
    const [isPlanGrowInCG, setIsPlanGrowInCG] = useState("");
    const [MSJCommitment, setMSJCommitment] = useState("");
    const MSJCourse = ["MSJ1", "MSJ2", "MSJ3"];
    const [whyChooseMinistry, setWhyChooseMinistry] = useState("");
    const [knowHowMuch, setKnowHowMuch] = useState("");
    const [yourSkill, setYourSkill] = useState("");
    const [expectation, setExpectation] = useState("");
    const [remark, setRemark] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const selected = localStorage.getItem("cyc-recruitment-interview-selected")
        if (selected){
            const selectedData = JSON.parse(selected)
            setDepartment(selectedData.department)
            setMinistry(selectedData.ministry)
            setCandidate(selectedData.candidate)
            setName(selectedData.name)
            setEmail(selectedData.email)
            setPhone(selectedData.phone)
        }
    }, []);

    function submit(){
        if (!committedTime){
            alert("Please select committed time")
            return
        }
        if (!isPlanGrowInCG){
            alert("Please select plan to grow in connect group")
            return
        }
        if (!MSJCommitment){
            alert("Please select MSJ commitment")
            return
        }

        const data = {
            name,
            email,
            phone,
            department,
            ministry,
            committedTime,
            isPlanGrowInCG,
            MSJCommitment,
            whyChooseMinistry,
            knowHowMuch,
            yourSkill,
            expectation,
            remark,
            datetime : new Date().toLocaleString()
        }
        // console.log(data)
        const options = {
            title: '',
            message: 'Confirm to submit?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => postdata(data)
                },
                {
                    label: 'Non',
                    // onClick: () => alert('Click No')
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            willUnmount: () => { },
            afterClose: () => { },
            onClickOutside: () => { },
            onKeypress: () => { },
            onKeypressEscape: () => { },
            overlayClassName: "overlay-custom-class-name"
        };

        confirmAlert(options)

    }

    async function postdata(data){
        const url = `https://recruitment-api.fgacyc.com/candidate`
        const response = await  fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const data1 = await response.json()
        if(data1.status){
            alert("Submitted successfully")
            navigate("/choose-candidate")
        }
    }

    return (
        <div style={{
            color: "black",
            padding: "1rem 3rem",
        }}>
            <div style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1rem',
                fontFamily: "SF Pro Display",
                margin: "1rem 0",
                marginBottom: "40px",
            }}>Ministry Recruitment Interview
            </div>

            {/* share yourself */}
            <div>
                <div style={{
                    marginBottom: "20px",
                    fontSize: "18px",
                    color: "#595959",
                    fontFamily: "SF Pro Display",
                }}>Share about yourself
                </div>
                <QuestionBlock title="Committed in church for how long">
                    <select
                        className="submission-select"
                        name="Choose duration"
                        id="pastoral_team"
                        value={committedTime}
                        onChange={(e) => {
                            setCommittedTime(e.target.value)
                        }}
                    >
                        <option value="">Select duration</option>
                        {
                            durations.map((duration, index) => {
                                return (
                                    <option key={index} value={duration}>{duration}</option>
                                )
                            })
                        }
                    </select>
                </QuestionBlock>

                <QuestionBlock title={"Any plans to grow in Connect Group"}>
                    <RadioGroup options={["Yes", "No"]} value={isPlanGrowInCG} setValue={setIsPlanGrowInCG}/>
                </QuestionBlock>

                <QuestionBlock title={"MSJ Commitment"}>
                    <RadioGroup options={MSJCourse} value={MSJCommitment} setValue={setMSJCommitment}/>
                </QuestionBlock>
            </div>


            {/* ministry related questions */}
            <div>
                <div style={{
                    marginBottom: "20px",
                    fontSize: "18px",
                    color: "#595959",
                    marginTop: 40,
                    fontFamily: "SF Pro Display",
                }}>Ministry Related Questions
                </div>

                <QuestionBlock title={"Why do you choose this ministry"}>
                    <QuestionTextarea value={whyChooseMinistry} onChange={setWhyChooseMinistry}/>
                </QuestionBlock>

                <QuestionBlock title={"How much di you know about this ministry"}>
                    <QuestionTextarea value={knowHowMuch} onChange={setKnowHowMuch}/>
                </QuestionBlock>

                <QuestionBlock title={"What skills do you possess which are related to this ministry"}>
                    <QuestionTextarea value={yourSkill} onChange={setYourSkill}/>
                </QuestionBlock>

                <QuestionBlock title={"What is you expectation of this ministry"}>
                    <QuestionTextarea value={expectation} onChange={setExpectation}/>
                </QuestionBlock>

                <QuestionBlock title={"Other remarks"}>
                    <QuestionTextarea value={remark} onChange={setRemark}/>
                </QuestionBlock>
            </div>

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
                onClick={submit}
            >
                Submit
            </button>
        </div>
    )
}