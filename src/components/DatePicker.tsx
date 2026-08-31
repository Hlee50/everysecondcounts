import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './DatePicker.css'

interface DatePickerProps {
    selectedDate: Date;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

export function DatePicker({ selectedDate, setSelectedDate }: DatePickerProps) {
    const handleChange = (date: Date | null) => {
        if (!date) return;
        setSelectedDate(date);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        window.history.replaceState(null,'',`?date=${year}-${month}-${day}`);
    };

    return (
        <>
            <ReactDatePicker selected={selectedDate} onChange={handleChange} popperPlacement="bottom-start" />
        </>
    );
}