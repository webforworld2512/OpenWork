#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: "Test the LeadLens application at http://localhost:3000. This is an anonymous employee feedback platform with two roles: Employee and Leadership (Admin)."

frontend:
  - task: "Landing Page Navigation"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/pages/LandingPage.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
        -working: "NA"
        -agent: "testing"
        -comment: "Verify landing page loads with hero section, features, and CTA buttons. Check 'Sign In' button navigates to /login and 'Get Started' button navigates to /login."

  - task: "Login Page Functionality"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/pages/LoginPage.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
        -working: "NA"
        -agent: "testing"
        -comment: "Verify login form renders with email/password fields. Test 'Leadership Login' and 'Employee Login' quick buttons."

  - task: "Employee Dashboard"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/pages/employee/EmployeeHome.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
        -working: "NA"
        -agent: "testing"
        -comment: "Verify Employee Home page shows welcome message, quick actions, privacy notice. Check navigation to feedback form."

  - task: "Employee Feedback Submission"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/pages/employee/SubmitFeedback.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
        -working: "NA"
        -agent: "testing"
        -comment: "Test full feedback submission flow: select domain, project, manager, fill star ratings, enter text, submit and verify success message."

  - task: "Employee Domain Browsing"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/pages/employee/BrowseDomains.jsx"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
        -working: "NA"
        -agent: "testing"
        -comment: "Verify domains list renders with 5 domains. Check domain detail page shows projects and managers."

  - task: "Admin Dashboard"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/pages/leadership/LeadershipDashboard.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
        -working: "NA"
        -agent: "testing"
        -comment: "Verify sidebar with navigation items. Check dashboard metric cards, trend chart, rating distributions."

  - task: "Admin Manager Insights"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/pages/leadership/ManagerInsights.jsx"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
        -working: "NA"
        -agent: "testing"
        -comment: "Verify manager selector, metrics, ratings tab, trends tab, AI Insights tab."

  - task: "Admin Domain Insights"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/pages/leadership/DomainInsights.jsx"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
        -working: "NA"
        -agent: "testing"
        -comment: "Verify domain selector, metrics, ratings, trends, managers tab."

  - task: "Admin Domains Management"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/pages/leadership/ManageDomains.jsx"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
        -working: "NA"
        -agent: "testing"
        -comment: "Verify list with edit/delete buttons, add button opens dialog."

  - task: "Admin Projects Management"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/pages/leadership/ManageProjects.jsx"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
        -working: "NA"
        -agent: "testing"
        -comment: "Verify list with domain/manager info."

  - task: "Admin Managers Management"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/pages/leadership/ManageManagers.jsx"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
        -working: "NA"
        -agent: "testing"
        -comment: "Verify grid with avatar/title/domain."

  - task: "Admin Users Management"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/pages/leadership/ManageUsers.jsx"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
        -working: "NA"
        -agent: "testing"
        -comment: "Verify user list with role assignment dropdown."

  - task: "Access Control"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/layout/DashboardLayout.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
        -working: "NA"
        -agent: "testing"
        -comment: "Verify employee cannot access admin routes. Check admin can access all admin routes."

metadata:
  created_by: "testing_agent"
  version: "1.0"
  test_sequence: 0
  run_ui: true

test_plan:
  current_focus:
    - "Landing Page Navigation"
    - "Login Page Functionality" 
    - "Employee Dashboard"
    - "Employee Feedback Submission"
    - "Employee Domain Browsing"
    - "Admin Dashboard"
    - "Access Control"
  stuck_tasks: []
  test_all: true
  test_priority: "high_first"

agent_communication:
    -agent: "testing"
    -message: "Initializing test plan for LeadLens application. Will test all frontend components with priority on high importance tasks."