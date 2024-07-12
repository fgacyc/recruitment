export default function QuestionBlock({children,title}) {
    return (
        <div style={{
            marginBottom: "20px",
        }}>
           <div style={{
                fontSize: "14px",
                fontWeight: "bold",
               color: "#595959",
           }}>{title}</div>
            <div> {children}</div>
        </div>
    )
}