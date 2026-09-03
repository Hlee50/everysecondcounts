import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import './DatePicker.css'

interface DatePickerProps {
    selectedDate: Date;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

export function DatePicker({ selectedDate, setSelectedDate }: DatePickerProps) {
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 10);

    const handleChange = (date: Date | null) => {
        if (!date) return;
        date.setHours(0, 0, 0, 0);
        setSelectedDate(date);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        window.history.replaceState(null,'',`?date=${year}-${month}-${day}`);
    };

    return (
        <>
            <ReactDatePicker 
                selected={selectedDate} 
                onChange={handleChange}
                minDate={minDate}
                maxDate={maxDate}
                popperPlacement="bottom-start"
            />
        </>
    );
}