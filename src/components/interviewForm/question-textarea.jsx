export  default function QuestionTextarea({value, onChange}) {
    return (
        <textarea
            rows={4}
            style={{
                width: "100%",
                borderRadius: "5px",
                border: "1px solid #595959",
                fontSize: "14px",
                color: "#595959",
                marginTop: "10px",
                resize: "none"
            }}
            value={value}
            onChange={(e) => {
                onChange(e.target.value)
            }}
        />
    )

}