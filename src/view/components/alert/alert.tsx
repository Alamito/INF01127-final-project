import { ReactElement } from "react"
import { Alert, Col, Row } from "react-bootstrap"
import "./alert.css"
// instantianting the component should be as below, the icon should be a react-icon!
// theme is one of the themes in bootstrap
// text is the string with the message you wanna display
{/* <GenericAlert text="there is a text in this alert" theme="info">
<FaCircleInfo/>
</GenericAlert> */}

interface GenericAlertProps {  
    theme: string
    text: string
    children: ReactElement
    className: string
    showModal: boolean
}
export function GenericAlert (props: GenericAlertProps): ReactElement {
    return (
        <Alert show={props.showModal} variant={props.theme} style={{ display: 'inline-flex', alignItems: 'center' }} className={`${props.className}`}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={1}>
                    {props.children}
                </Col>
                <Col>
                    {props.text}
                </Col>
            </Row>
        </Alert>
    )
}