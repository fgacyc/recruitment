import './memberRegistration.css'
import { useEffect, useState } from 'react';
import PubSub from 'pubsub-js';
import { confirmAlert } from 'react-confirm-alert';
import { get } from 'idb-keyval'
import { Input } from '../../Form/Input/Input';
import { GenderPicker } from '../LeaderRegistration/LeaderRegistration';
import { role_data } from './role_data';
import { getRandomSixDigitPassword, validateEmail, validateID, validateName, validatePhone, validateField } from '../../../js/form';
import { capitalFirstLetter, capitalizeAndReplace } from "../../../js/string.js";

function MemberCard({ name, role, onDelete, color }) {
    const handleDelete = () => {
        onDelete();
    };

    return (
        <div className='mem-card-con'>
            <div
                className='flex flex-col justify-end selection-card'
                style={{ backgroundColor: color }}
            >
                <div className='selection-card-upper'>
                    <h4 className='mem-card-h4'>{capitalizeAndReplace(role)}</h4>
                    <div
                        className='selection-card-delete-con'
                        onClick={handleDelete}
                    >
                        <img src='/icons/delete.svg' alt='delete' className='selection-card-delete' />
                    </div>
                </div>
                <h2 className='mem-card-h2'>{name}</h2>
            </div>
        </div>
    )
}

function CloseIcon({ onClose }) {
    return (
        <img
            src='/icons/cross.png'
            alt='Cross Icon'
            className='close-button'
            onClick={onClose}
        />
    )
}

function RolePicker({ onSelect }) {
    const [showInitialOption, setShowInitialOption] = useState(true);

    const handleSelect = (event) => {
        const selectedValue = event.target.value;
        onSelect(selectedValue);
        setShowInitialOption(false);
    };

    return (
        <select
            className='appointment-select'
            value={showInitialOption ? '' : undefined}
            onChange={handleSelect}
        >
            <option value='' disabled hidden>Select a role</option>
            {
                role_data.map((option, index) => {
                    return (
                        <option key={index} value={option.value}>{option.label}</option>
                    )
                })
            }
        </select>
    )
}

function Registration({ onClose }) {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('')
    const [id, setId] = useState('')
    const [gender, setGender] = useState('')
    const [role, setRole] = useState('')
    const [fnameError, setFnameError] = useState('');
    const [lnameError, setLnameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('')
    const [idError, setIdError] = useState('')
    const [genderError, setGenderError] = useState('')
    const [roleError, setRoleError] = useState('')

    const handleChange = (event, setField, setFieldError) => {
        setField(event.target.value);
        setFieldError('');
    }

    const handleSelect = (selectedValue, setField, setFieldError) => {
        setField(selectedValue);
        setFieldError('');
    };

    const handleMemberList = (member_data) => {
        PubSub.publish('memberlist', member_data)
    }

    const handleData = () => {
        const capitalName = capitalFirstLetter(fname) + ' ' + capitalFirstLetter(lname);

        const member_data = {
            email,
            password: `${getRandomSixDigitPassword()}@Aa`,
            username: `${fname.toLowerCase()}_${lname.toLowerCase()}`,
            given_name: fname,
            family_name: lname,
            name: capitalName,
            gender,
            ic_number: id,
            phone_number: phone,
            nickname: capitalName,
            picture: null,
            cg_id: null,
            role,
        }
        handleMemberList(member_data);

        return member_data;
    }

    // const postLeaderData = async (member_data) => {
    //     try {
    //         let res = await postReq('/cgl', member_data);
    //         if (res.status === true) {
    //             setCreatedLeaderData(res.data);
    //             alert("Please screenshot this page for your reference")
    //         }
    //         console.log(res);
    //     } catch (error) {
    //         console.error('Error during postLeaderData:', error);
    //     }
    // };

    const handleSubmit = (event) => {
        event.preventDefault();

        const isFnameValid = validateName(fname, setFnameError);
        const isLnameValid = validateName(lname, setLnameError);
        const isPhoneValid = validatePhone(phone, setPhoneError);
        const isEmailValid = validateEmail(email, setEmailError);
        const isIdValid = validateID(id, setIdError);
        const isRoleValid = validateField(role, setRoleError, "Member's role is required");

        if (isFnameValid && isLnameValid && isPhoneValid && isEmailValid && isIdValid && isRoleValid) {
            const member_data = handleData();
            console.log(member_data)
            // postLeaderData(member_data);

            onClose();
        }
    }

    return (
        <form
            className='flex flex-col justify-between appointment-container 
                        align-center relative transparent-background'
            style={{ overflow: "auto", height: "100vh" }}
            onSubmit={handleSubmit}
        >
            <CloseIcon onClose={onClose} />

            <div>
                <div className='flex flex-col mt-35'>
                    <Input
                        label={'First Name'}
                        value={fname}
                        onChange={(event) => { handleChange(event, setFname, setFnameError) }}
                        error={fnameError}
                    />

                    <Input
                        label={'Last Name'}
                        value={lname}
                        onChange={(event) => { handleChange(event, setLname, setLnameError) }}
                        error={lnameError}
                    />

                    <Input
                        label={'Contact No.'}
                        value={phone}
                        onChange={(event) => { handleChange(event, setPhone, setPhoneError) }}
                        error={phoneError}
                    />

                    <Input
                        label={'Email Address'}
                        value={email}
                        onChange={(event) => { handleChange(event, setEmail, setEmailError) }}
                        error={emailError}
                    />

                    <Input
                        label={'Identity Card/ Passport No.'}
                        value={id}
                        onChange={(event) => { handleChange(event, setId, setIdError) }}
                        error={idError}
                    />

                    <>
                        <label className='input-text' value={gender}>Gender</label>
                        <GenderPicker onSelect={(selectedValue) => { handleSelect(selectedValue, setGender, setGenderError) }} />
                        {genderError && <div className='input-error'>{genderError}</div>}
                    </>

                    <>
                        <label className='input-text' value={role}>Role</label>
                        <RolePicker onSelect={(selectedValue) => { handleSelect(selectedValue, setRole, setRoleError) }} />
                        {roleError && <div className='input-error'>{roleError}</div>}
                    </>
                </div>
                <button type='submit' className='btn-submit'>Submit</button>
            </div>
        </form >
    );
}

export default function MemberRegistration() {
    const [memberlist, setMemberlist] = useState([])

    const colors = ['#336397', '#00bb9e', '#e46e48']

    const [leaderData, setLeaderData] = useState({})

    useEffect(() => {
        const fetchLeaderData = async () => {
            let leader_data = await get('leader_data');
            if(!leader_data){
                window.location.href = '/login';
            }
            setLeaderData(leader_data);
            // console.log(leader_data);
        };

        fetchLeaderData();

        PubSub.subscribe('memberlist', (_, member_data) => {
            setMemberlist([...memberlist, member_data])

            return () => PubSub.unsubscribe('memberlist')
        })
    }, [memberlist])

    const addMember = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <Registration onClose={onClose} />
                )
            }
        });
    }

    const handleDeleteMember = (index) => {
        const updatedList = [...memberlist];
        updatedList.splice(index, 1);
        setMemberlist(updatedList);
    };

    return (
        <div className='flex flex-col align-center mem-reg-con'>
            <h3 className='h3-mem-reg-con'>Member Registration</h3>

            <button className='square-add-button' onClick={addMember}>+</button>

            {
                memberlist.map((member, index) => {
                    const colorIndex = index % colors.length;

                    return <MemberCard
                        key={index}
                        role={member.role}
                        name={capitalFirstLetter(member.given_name) + ' ' + capitalFirstLetter(member.family_name)}
                        onDelete={() => handleDeleteMember(index)}
                        color={colors[colorIndex]}
                    />
                })
            }
        </div>
    )
}