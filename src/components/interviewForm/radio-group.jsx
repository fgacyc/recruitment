export function RadioGroup({options, value, setValue}) {
    return (
        <div style={{display: "flex", marginTop: "10px"}}>
            {
                options && options.map((option, index) => {
                    return (
                        <div key={index} style={{display: "flex", justifyContent: "start", alignItems: "center", width: "100px"}}>
                            <input
                                type="radio"
                                name={options[0]}
                                value={option}
                                style={{
                                    height: "14px", margin: "0", width: "20px"
                                }}
                                onChange={(e) => {
                                    setValue(e.target.value)
                                }}
                                checked={value === option}
                            />
                            <label htmlFor={option} style={{color: "#595959"}}>{option}</label>
                        </div>
                    )
                })
            }
        </div>
    )
}