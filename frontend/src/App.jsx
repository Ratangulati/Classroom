import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ChooseUser from './pages/ChooseUser'
import AdminSignIn from './components/AdminSignin'
import TeacherSignIn from './components/TeacherSignin'
import StudentSignIn from './components/StudentSignin'
import AdminRegister from './components/AdminRegister'

import AdminDashboard from './pages/Admin/Dashboard'
import Announcement from './pages/Admin/Announcement'
import Attendance from './pages/Admin/Attendance'
import Classes from './pages/Admin/Classes'
import EventCalender from './pages/Admin/EventCalender'
import Exam from './pages/Admin/Exam'
import Library from './pages/Admin/Library'
import SettingsProfile from './pages/Admin/SettingsProfile'
import Sidebar from './pages/Admin/Sidebar'
import Students from './pages/Admin/Students'
import Teachers from './pages/Admin/Teachers'
import Performance from './pages/Admin/Performance'
import Assignment from './pages/Admin/Assignment'

import StudentDashboard from './pages/Students/Dashboard'
import AnnouncementStudent from './pages/Students/Announcements'
import StudentAssignments from './pages/Students/Assignments'
import StudentAttendance from './pages/Students/Attendance'
import Exams from './pages/Students/Exams'
import LibrarySection from './pages/Students/Library'
import PerformanceSection from './pages/Students/Performance'
import ProfileSection from './pages/Students/Profile'
import StudentSidebar from './pages/Students/Sidebar'
import TeacherDashboard from './pages/Teachers/Dashboard'
import AnnouncementTeacher from './pages/Teachers/Announcement'
import TeacherAssignments from './pages/Teachers/Assignment'
import CheckAttendanceSection from './pages/Teachers/Attendance'
import ClassSection from './pages/Teachers/Classes'
import EventSection from './pages/Teachers/Events'
import CheckExamSection from './pages/Teachers/Exams'
import CheckPerformanceSection from './pages/Teachers/Performance'
import TeacherProfileSection from './pages/Teachers/Profile'
import TeacherSidebar from './pages/Teachers/Sidebar'
import StudentSection from './pages/Teachers/Students'
import TeacherSection from './pages/Teachers/Teachers'


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

        <Route path="/admin/announcement" element={<Announcement />} />
        <Route path="/admin/attendance" element={<Attendance />} />
        <Route path="/admin/classes" element={<Classes />} />
        <Route path="/admin/events" element={<EventCalender/>} /> 
        <Route path="/admin/exams" element={<Exam />} />
        <Route path="/admin/library" element={<Library />} />
        <Route path="/admin/performance" element={<Performance />} />
        <Route path="/admin/settings" element={<SettingsProfile />} />
        <Route path="/admin/sidebar" element={<Sidebar />} />
        <Route path="/admin/students" element={<Students />} />
        <Route path="/admin/teachers" element={<Teachers />} /> 
        <Route path="/admin/assignments" element={<Assignment />} />

        <Route path="/student/announcement" element={<AnnouncementStudent />} />
        <Route path="/student/assignments" element={<StudentAssignments />} />
        <Route path="/student/attendance" element={<StudentAttendance />} />
        <Route path="/student/exams" element={<Exams />} />
        <Route path="/student/library" element={<LibrarySection />} />
        <Route path="/student/performance" element={<PerformanceSection />} />
        <Route path="/student/profile" element={<ProfileSection />} />
        <Route path="/student/sidebar" element={<StudentSidebar />} />

        <Route path="/teacher/announcement" element={<AnnouncementTeacher />} />
        <Route path="/teacher/assignments" element={<TeacherAssignments />} />
        <Route path="/teacher/attendance" element={<CheckAttendanceSection />} />
        <Route path="/teacher/classes" element={<ClassSection />} />
        <Route path="/teacher/events" element={<EventSection/>} /> 
        <Route path="/teacher/exams" element={<CheckExamSection />} />
        <Route path="/teacher/performance" element={<CheckPerformanceSection />} />
        <Route path="/teacher/profile" element={<TeacherProfileSection />} />
        <Route path="/teacher/sidebar" element={<TeacherSidebar />} />
        <Route path="/teacher/students" element={<StudentSection />} />
        <Route path="/teacher/teachers" element={<TeacherSection />} /> 

      </Routes>
    </BrowserRouter>
  )
}

export default App
 