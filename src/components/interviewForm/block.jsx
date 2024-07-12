import {ProgressBar} from "react-loader-spinner";

export default function Block({children,title, showloading = false}) {
    return (
        <div style={{
            marginBottom: "20px",
            fontFamily:"SF Pro Display",
        }}>
            <div className={"flex"} style={{
                justifyContent: "start",
                alignItems: "center",
                marginBottom: "10px",
                height: "30px",
            }} >
                <div style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#595959",
                }}>{title}</div>
                {
                    showloading &&  <ProgressBar
                        visible={true}
                        height="30"
                        width="80"
                        color="#12b886"
                        ariaLabel="progress-bar-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        borderColor="#595959"
                    />
                }
            </div>
            <div> {children}</div>
        </div>
    )
}