import Button from "./ui/ChooseUser/Button"
import ChooseUserContainer from "./ui/ChooseUser/ChooseUserContainer"
import Title from "./ui/ChooseUser/Title"
import UserSection from "./ui/ChooseUser/UserSection"

const ChooseUser = () => {
    return (
        <ChooseUserContainer>
            <UserSection>
                <Title>Admin</Title>
                <Button to="/admin/signin">Login as Admin</Button>
            </UserSection>
            <UserSection>
                <Title>Teacher</Title>
                <Button to="/teacher/signin">Login as Teacher</Button>
            </UserSection>
            <UserSection>
                <Title>Student</Title>
                <Button to="/student/signin">Login as Student</Button>
            </UserSection>
        </ChooseUserContainer>
    )
}

export default ChooseUser;