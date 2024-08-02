import { ReactElement } from "react";
import { Container, Row } from "react-bootstrap";
import { DayInCalendar } from "./day_in_calendar";

function getWeekArray(): { day: number, dayInWeek: string }[] {
    const weekArray = [];
    const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];
    
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + i);
        const dayNumber = currentDate.getDate();
        const dayOfWeek = daysOfWeek[currentDate.getDay()];
        
        weekArray.push({
            day: dayNumber,
            dayInWeek: dayOfWeek
        });
    }
    
    return weekArray;
}

interface GenericCalendarProps {
    title: string
}
export function GenericCalendar ( props: GenericCalendarProps): ReactElement {
    // gets the 7 days ahead starting with today
    const week = getWeekArray()
    return (
    <Container>
        {props.title}
        <Row>
            {week.map((day) => <DayInCalendar dayInWeek={day.dayInWeek} day={day.day}/>)}
        </Row>
    </Container>
    )
}