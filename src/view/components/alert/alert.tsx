import { ReactElement } from "react"
import { Alert, Col, Row } from "react-bootstrap"

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
}
export function GenericAlert (props: GenericAlertProps): ReactElement {
    return (
        <Alert variant={props.theme} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <Row style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <Col>
                    <div>{props.children}</div>
                </Col>
                <Col>
                    {props.text}
                </Col>
            </Row>
        </Alert>
    )
}