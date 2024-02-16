export default function alert(props){
    return(
        <>
        <div className={`position-fixed alert alert-${props.alert.type} rounded-3 p-2 d-flex justify-content-center w-25`} role="alert">
            {`${props.alert.message}`}
        </div>
        </>
    )
}