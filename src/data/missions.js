// Mission locations with coordinates and quiz questions
const MISSIONS = [
  {
    id: 'mission-1',
    title: 'Find the Cafeteria',
    description: 'Locate the university cafeteria',
    coordinates: { x: 2.6, y: 2.7, z: -5.0 },
    completed: false,
    info: {
      title: 'University Cafeteria',
      description: 'The cafeteria is the heart of campus life, offering nutritious meals and a space for students to socialize. Open from 7 AM to 8 PM daily, it features various food stations including hot meals, salads, sandwiches, and beverages.',
      details: [
        '🍽️ Breakfast: 7:00 AM - 10:00 AM',
        '🥗 Lunch: 12:00 PM - 3:00 PM',
        '🍕 Dinner: 5:00 PM - 8:00 PM',
        '☕ Snacks & Coffee: All day'
      ]
    },
    questions: [
      {
        question: 'You are new to campus and feeling hungry. Where should you go?',
        options: ['Lecture Hall', 'Staff Room', 'Cafeteria', 'SRU Office'],
        correctAnswer: 2
      },
      {
        question: 'What is the main purpose of the cafeteria?',
        options: ['Conduct lectures', 'Provide food and drinks', 'Store academic records', 'Hold exams'],
        correctAnswer: 1
      },
      {
        question: 'The cafeteria is usually busiest during which time?',
        options: ['7.00 AM', 'Lunch break', 'Late night', 'During lectures'],
        correctAnswer: 1
      },
      {
        question: 'Which item are you most likely to find inside the cafeteria?',
        options: ['Projector', 'Food counter', 'Lab equipment', 'Staff files'],
        correctAnswer: 1
      },
      {
        question: 'Why is the cafeteria important for students?',
        options: ['It replaces classrooms', 'It supports social interaction', 'It stores grades', 'It controls WiFi'],
        correctAnswer: 1
      },
      {
        question: 'What should you do after finishing your meal?',
        options: ['Leave everything on the table', 'Clean your table and dispose waste properly', 'Move to another table', 'Switch off lights'],
        correctAnswer: 1
      },
      {
        question: 'Who is responsible for maintaining hygiene in the cafeteria?',
        options: ['Students', 'Lecturers', 'Cafeteria staff', 'Security'],
        correctAnswer: 2
      },
      {
        question: 'Besides food, what does the cafeteria promote?',
        options: ['Isolation', 'Competition', 'Community bonding', 'Examination stress'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'mission-2',
    title: 'Visit SRU Office',
    description: 'Find the Student Resource Unit Office',
    coordinates: { x: -4.3, y: 7.1, z: -6.1 },
    completed: false,
    info: {
      title: 'Student Resource Unit (SRU)',
      description: 'The Student Resource Unit, SRU, supports students with academic administration and official services. Students visit this office for documentation, academic letters, and help with university procedures.',
      
      details: [
        '📚 Academic letters and official documents',
        '📖 Module registration assistance',
        '👨‍🎓 Student record support',
        '👩‍💼 Help with administrative inquiries',
        '🎓 Guidance on university procedures',
        '⏱️ Open during normal administrative office hours'
      ]
    },
    questions: [
      {
        question: 'What is the main purpose of the SRU office?',
        options: ['Conduct lectures', 'Support students with administrative services', 'Provide library books', 'Manage student clubs'],
        correctAnswer: 1
      },
      {
        question: 'Which type of issue should students take to the SRU office?',
        options: ['Classroom teaching problems', 'Academic administration and documentation', 'Sports activities', 'Food services'],
        correctAnswer: 1
      },
      {
        question: 'What type of documents might students request from SRU?',
        options: ['Lecture slides', 'Academic letters and official documents', 'Exam papers', ' Library books'],
        correctAnswer: 1
      },
      {
        question: 'When students need help with university procedures, where should they go first?',
        options: ['Reception', 'Library', 'SRU Office', 'Auditorium'],
        correctAnswer: 2
      },
      {
        question: 'SRU mainly deals with which type of support?',
        options: ['Academic lectures', 'Administrative and student services', ' Entertainment activities', 'Cafeteria services'],
        correctAnswer: 1
      },
      {
        question: 'What role does SRU staff play for students?',
        options: ['Teaching programming', 'Managing sports teams', 'Guiding students on administrative processes', 'Organizing events'],
        correctAnswer: 2
      },
      {
        question: 'If you miss an exam, where do you report?',
        options: ['Auditorium', 'Cafeteria', 'SRU', 'Library'],
        correctAnswer: 2
      },
    ]
  },
  {
    id: 'mission-3',
    title: 'Find Tutorial Room 1LA',
    description: 'Locate the main tutorial room',
    coordinates: { x: -7.5, y: 7.1, z: -5.8 },
    completed: false,
    info: {
      title: 'Tutorial Room 1LA',
      description: 'Tutorial Room 1LA is a main teaching space used for tutorials, and presentations. Many core module sessions take place here according to the student timetable.',
      details: [
        '🎥 Presentation and teaching environment',
        '📑 Lectures conducted by academic staff',
        '⏰ Sessions follow the module timetable'
      ]
    },
    questions: [
      {
        question: 'What is the primary use of Tutorial Room 1LA?',
        options: ['Student meetings', 'Academic tutorials and seminars', 'Sports activities', 'Administrative work'],
        correctAnswer: 1
      },
      {
        question: 'What do students normally follow to attend lectures in halls like 1LA?',
        options: ['Event calendar', 'Personal schedule', 'Modern AV technology', 'Only a whiteboard'],
        correctAnswer: 2
      },
      {
        question: 'What activity commonly happens in tutorial halls?',
        options: ['Programming competitions', 'Presentations and teaching sessions', 'Food services', ' Sports training'],
        correctAnswer: 1
      },
      {
        question: 'What is expected from students inside a lecture hall?',
        options: ['Maintain discipline and listen to the lecturer', ' Talk loudly with friends', 'Use mobile phones continuously', 'Walk around during the session'],
        correctAnswer: 2
      },
      {
        question: 'The lecture hall is suitable for:',
        options: ['Small group work', 'Large lectures', 'Individual study', 'Storage'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'mission-4',
    title: 'Find Staff Hierarchy',
    description: 'Discover the staff information board',
    coordinates: { x: 1.0, y: 25.6, z: -4.6 },
    completed: false,
    info: {
      title: 'Staff Hierarchy Board',
      description: 'The staff hierarchy shows the academic structure of the institute. It explains how responsibilities flow from senior leadership to teaching staff. This helps students understand who manages the faculty and who delivers the lectures.',
      details: [
        '👔 Dean / Director Board leads the academic faculty',
        '📖 Senior Lecturers manage modules and guide teaching',
        '🔧 Assistant Lecturers support teaching and student learning',
        '🔎 Helps students understand the academic chain of responsibility'
      ]
    },
    questions: [
      {
        question: 'What does the staff hierarchy represent?',
        options: ['Student grades', 'Organizational structure of the school', 'Cafeteria menu', 'Exam schedule'],
        correctAnswer: 1
      },
      {
        question: 'Who is usually at the top of a school hierarchy?',
        options: ['Assistant Lecturer', 'Student Representative', 'Dean', 'Lab Assistant'],
        correctAnswer: 2
      },
      {
        question: 'Who manages a specific academic department?',
        options: ['Head of School or Program Leader', 'Cafeteria Manager', 'Reception Officer', 'Security Supervisor'],
        correctAnswer: 0
      },
      {
        question: 'What is the main role of a Lecturer?',
        options: ['Teach and guide students', 'Handle food services', 'Manage security', 'Maintain servers'],
        correctAnswer: 0
      },
      {
        question: 'Assistant Lecturers mainly support which activity?',
        options: ['Administrative finance', 'Teaching and lab sessions', 'Auditorium lighting', 'Visitor registration'],
        correctAnswer: 1
      },
      {
        question: 'Why is it important for students to understand staff hierarchy?',
        options: ['To know who to contact for academic matters', 'To find food', 'To book classrooms', 'To manage events'],
        correctAnswer: 0
      },
      {
        question: 'If you have an academic complaint, who would you escalate to first?',
        options: ['Security', 'Reception', 'Lecturer or Program Leader', 'Cafeteria staff'],
        correctAnswer: 2
      },
    ]
  },
  {
    id: 'mission-5',
    title: 'Visit Auditorium',
    description: 'Find the university auditorium',
    coordinates: { x: -3.1, y: 29.4, z: -5.2 },
    completed: false,
    info: {
      title: 'University Auditorium',
      description: 'The auditorium is a large event space used for important university activities such as orientations, guest lectures, workshops, and student events.z',
      details: [
        '🎥 Guest lectures and presentations',
        '👨‍🎓 Orientation programs for new students',
        '🎤 Stage with audio visual equipment',
        '🎭 Student events and ceremonies',
        '🪑 Large seating capacity for audiences'
      ]
    },
    questions: [
      {
        question: 'The auditorium is mainly used for:',
        options: ['Small group discussions', 'Large lectures and major events', 'Food service', 'Student registration'],
        correctAnswer: 1
      },
      {
        question: 'Why are some lectures conducted in the auditorium instead of a normal lecture hall?',
        options: ['It has kitchen facilities', 'It can accommodate a large number of students', 'It stores equipment', 'It handles student records'],
        correctAnswer: 1
      },
      {
        question: 'What type of university events are often held in the auditorium?',
        options: ['Graduation ceremonies', 'Sports practice', 'Cafeteria meetings', 'IT server maintenance'],
        correctAnswer: 0
      },
      {
        question: 'What makes an auditorium different from a classroom?',
        options: ['Larger space designed for big audiences', 'Smaller seating capacity', 'No presentation equipment', 'Only used for exams'],
        correctAnswer: 0
      },
      {
        question: 'During a guest lecture in the auditorium, students should:',
        options: ['Stay attentive and respectful', 'Move around constantly', 'Use loud conversations', 'Change seats randomly'],
        correctAnswer: 0
      },
      {
        question: 'What should you avoid to maintain a professional environment?',
        options: ['Respecting the event', 'Using proper behavior', 'Making unnecessary noise', 'Paying attention'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'mission-6',
    title: 'Find the Main Reception',
    description: 'Locate the main university reception desk',
    coordinates: { x: -5.5, y: 2.7, z: -6.5 },
    completed: false,
    info: {
      title: 'Main Reception',
      description: 'The main reception is the first point of contact for visitors and students entering the institute. Reception staff provide directions, information, and visitor assistance.',
      details: [
        '🚪 Main entrance access point',
        'ℹ️ General information desk',
        '🎫 Visitor pass issuance',
        '📍 Campus directions',
        '📞 Call routing assistance',
        '🕒 Open: Mon-Fri, 8 AM - 6 PM'
      ]
    },
    questions: [
      {
        question: 'What is the main role of the reception desk?',
        options: ['Conduct lectures', 'Provide information and directions', ' Manage student exams', 'Run student clubs'],
        correctAnswer: 1
      },
      {
        question: 'Who usually approaches the reception desk?',
        options: ['Visitors and students who need guidance', 'Only lecturers', 'Only administrators', 'Only security staff'],
        correctAnswer: 0
      },
      {
        question: 'Why is reception important in an institution?',
        options: ['It helps visitors find their way and get information', 'It manages lectures', ' It organizes exams', 'It conducts research'],
        correctAnswer: 0
      },
      {
        question: 'If visitors enter the building, where should they report first?',
        options: ['Cafeteria', 'Lecture Hall', 'Main Reception', 'Auditorium'],
        correctAnswer: 2
      },
      {
        question: 'What information can reception provide?',
        options: ['Campus directions', 'Exam answers', 'Private staff data', 'Server passwords'],
        correctAnswer: 0
      },
      {
        question: 'What behavior is inappropriate at reception?',
        options: ['Waiting patiently', 'Interrupting others', 'Following instructions', 'Showing ID when asked'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'mission-7',
    title: 'Find IT Department',
    description: 'Locate the IT Department',
    coordinates: { x: -3.0, y: 10.4, z: -5.7 },
    completed: false,
    info: {
      title: 'IT Department',
      description: 'The IT Department provides technical support and resources for all students and staff. Visit us for help with account issues, software installation, and hardware troubleshooting.',
      details: [
        '💻 Technical Support',
        '🔐 Account Management',
        '📡 WiFi Connectivity',
        '🛠️ Hardware Repair',
        '💾 Software Licenses'
      ]
    },
    questions: [
      {
        question: 'What is the main responsibility of the IT Department?',
        options: ['Managing food services', 'Maintaining campus technology systems', 'Conducting lectures', 'Handling student finance'],
        correctAnswer: 1
      },
      {
        question: 'If campus WiFi is not working, which department handles it?',
        options: ['Reception', 'SRU', 'IT Department', 'Cafeteria'],
        correctAnswer: 2
      },
      {
        question: 'What type of room is most likely inside the IT Department?',
        options: ['Server room', 'Kitchen', 'Auditorium stage', 'Lecture podium'],
        correctAnswer: 0
      },
      {
        question: 'Why is the IT Department important in a modern university?',
        options: ['It supports digital learning systems', 'It organizes graduation', 'It handles student attendance manually', 'It manages food counters'],
        correctAnswer: 0
      },
      {
        question: 'In your UniVerse 3D project, which system would logically be managed by IT?',
        options: ['Mission quiz database', 'Cafeteria seating', 'Auditorium stage lights', 'Reception desk'],
        correctAnswer: 0
      },
      {
        question: 'If lab computers stop working before a practical, who should be contacted?',
        options: ['Security', 'IT Department', 'Reception', 'Lecturer only'],
        correctAnswer: 1
      },
      {
        question: 'What is a key responsibility of IT staff?',
        options: ['Installing and maintaining software', 'Managing exam papers', 'Serving meals', 'Organizing events'],
        correctAnswer: 0
      },
      {
        question: 'Why is cybersecurity important for the IT Department?',
        options: ['To protect student and staff data', 'To improve cafeteria hygiene', 'To manage seating', 'To control elevators'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'mission-8',
    title: 'Letter Hunt Challenge',
    description: 'Collect hidden letters to unlock a special gift!',
    coordinates: { x: -5.3, y: 4.5, z: 2.4 },
    completed: false,
    isMiniGame: true,
    info: {
      title: 'Letter Hunt Challenge',
      description: 'Find all the letters in the IIT library to reveal a hidden treasure. Use your navigation skills to track them down!',
      details: [
        '🔍 Find 3 Hidden Letters (I, I, T)',
        '🏗️ Navigate through multi-level floors',
        '🎁 Unlock a special reward box',
        '⌨️ Press E to collect letters'
      ]
    }
  },
  {
    id: 'mission-9',
    title: 'Treasure Hunt Adventure',
    description: 'Find the ancient key and unlock the treasure chest!',
    coordinates: { x: -2.1, y: 13.6, z: -5.1 },
    completed: false,
    isMiniGame: true,
    info: {
      title: 'Treasure Hunt Adventure',
      description: 'A legendary treasure chest is hidden on campus. You must first find the golden key before you can unlock its secrets.',
      details: [
        '🗝️ Locate the Golden Key',
        '📦 Find the locked Treasure Chest',
        '💎 Claim the ancient gem reward',
        '⌨️ Press E to interact'
      ]
    }
  }
];

export default MISSIONS;