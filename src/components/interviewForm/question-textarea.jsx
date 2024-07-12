export  default function QuestionTextarea({value, onChange}) {
    return (
        <textarea
            rows={4}
            style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #595959",
                fontSize: "14px",
                color: "#595959",
                marginTop: "10px"
            }}
            value={value}
            onChange={(e) => {
                onChange(e.target.value)
            }}
        />
    )

}