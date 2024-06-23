import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ChooseUser from './pages/ChooseUser'
import AdminSignIn from './components/AdminSignin'
import TeacherSignIn from './components/TeacherSignin'
import StudentSignIn from './components/StudentSignin'
import AdminRegister from './components/AdminRegister'

import AdminDashboard from './pages/Admin/Dashboard'
import Classes from './pages/Admin/Classes'
import Events from './components/Events'
import Sidebar from './pages/Admin/Sidebar'
import Students from './pages/Admin/Students'
import Teachers from './pages/Admin/Teachers'
import AddAnnouncement from './pages/Admin/Add.../AddAnouncement'
import AddClass from './pages/Admin/Add.../AddClass'
import AddStudent from './pages/Admin/Add.../AddStudent'
import AddTeacher from './pages/Admin/Add.../AddTeacher'
import AddEvent from './pages/Admin/Add.../AddEvent'


import StudentDashboard from './pages/Students/Dashboard'
import AnnouncementStudent from './pages/Students/Announcements'
import StudentAssignments from './pages/Students/Assignments'
import StudentAttendance from './pages/Students/Attendance'
import LibrarySection from './pages/Students/Library'
import ProfileSection from './pages/Students/Profile'
import StudentSidebar from './pages/Students/Sidebar'

import TeacherDashboard from './pages/Teachers/Dashboard'
import TeacherAssignments from './pages/Teachers/Assignments'
import ClassSection from './pages/Teachers/Classes'
import TeacherProfileSection from './pages/Teachers/Profile'
import TeacherSidebar from './pages/Teachers/Sidebar'
import ClassDetails from './pages/Admin/ClassDetails'
import AddSubject from './pages/Admin/Add.../AddSubject'
import StudentDetails from './pages/Admin/StudentDetails'
import TeacherDetails from './pages/Admin/TeacherDetail'
import TeacherClassDetails from './pages/Teachers/ClassDetails'
import CreateAssignment from './pages/Teachers/Add.../CreateAssignment'
import Assignments from './pages/Teachers/Assignments'
import NoticeList from './pages/Teachers/Notice'
import CreateNotice from './pages/Teachers/Add.../CreateNotice'
import StudentNoticeList from './pages/Students/Notices'
import AdminProfile from './pages/Admin/Profile'





function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choose" element={<ChooseUser />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        <Route path="/admin/signin" element={<AdminSignIn />} />
        <Route path="/teacher/signin" element={<TeacherSignIn />} />
        <Route path="/student/signin" element={<StudentSignIn />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />

        <Route path="/admin/classes" element={<Classes />} />
        <Route path="/class/:classId" element={<ClassDetails />} />
        <Route path="/admin/events" element={<Events/>} /> 
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/sidebar" element={<Sidebar />} />
        <Route path="/admin/students" element={<Students />} />
        <Route path="/admin/students/:studentId" element={<StudentDetails />} />
        <Route path="/admin/student/create" element={<AddStudent />} />
        <Route path="/admin/teachers" element={<Teachers />} /> 
        <Route path="/admin/teachers/:teacherId" element={<TeacherDetails />} />
        <Route path="/create-class" element={<AddClass />} />
        <Route path="/create-announcement" element={<AddAnnouncement />} />
        {/* <Route path="/class/add-student/:classId" element={<AddStudent />} /> */}
        <Route path="/class/:classId/add-teacher" element={<AddTeacher />} />
        <Route path="/class/:classId/add-subject" element={<AddSubject />} />
        <Route path="/create-event" element={<AddEvent />} />



        <Route path="/student/announcement" element={<AnnouncementStudent />} />
        <Route path="/student/notices" element={<StudentNoticeList />} />
        <Route path="/student/assignments" element={<StudentAssignments />} />
        <Route path="/student/attendance" element={<StudentAttendance />} />
        <Route path="/student/library" element={<LibrarySection />} />
        <Route path="/student/profile" element={<ProfileSection />} />
        <Route path="/student/sidebar" element={<StudentSidebar />} />

        <Route path="/teacher/assignments" element={<TeacherAssignments />} />
        <Route path="/teacher/classes" element={<ClassSection />} />
        <Route path="/teacher/create-assignment/:classId" element={<CreateAssignment />} />
        <Route path="/teacher/assignments" element={<Assignments />} />
        <Route path="/teacher/class/:classId" element={<TeacherClassDetails />} />
        <Route path="/teacher/notices" element={<NoticeList/>} /> 
        <Route path="/teacher/create-notice/:classId" element={<CreateNotice/>} /> 
        <Route path="/teacher/profile" element={<TeacherProfileSection />} />
        <Route path="/teacher/sidebar" element={<TeacherSidebar />} />


      </Routes>
    </BrowserRouter>
  )
}

export default App
 