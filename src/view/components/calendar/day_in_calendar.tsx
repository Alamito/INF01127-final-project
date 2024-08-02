import { ReactElement } from "react"
import { Col, Row } from "react-bootstrap"

export interface SingleReserve {
    userThatReserved: string
    date: Date 
}

interface DayInCalendarProps {
    day: number 
    dayInWeek: string
    reserves?: SingleReserve[]
}

export function DayInCalendar (props: DayInCalendarProps): ReactElement {
    return (
        <Col xs={2}>
            <Row style={{height: '100px', border: '1px solid red'}}>
                <h4>{props.day}</h4>
                <h4 className="pull-right">{props.dayInWeek}</h4>
            </Row>
            <Row style={{height: '300px', border: '1px solid red'}}></Row>
            <Row style={{height: '300px', border: '1px solid red'}}></Row>
            <Row style={{height: '300px', border: '1px solid red'}}></Row>
        </Col>
    )
}