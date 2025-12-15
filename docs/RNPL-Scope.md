# RNPL-Scope

Let's start from the basics:

## 1. Signup & Login

Users will signup with their work email, Name, mobile number (for OTP and future use), designation, department, profile picture.

## 2. Login & Password Recovery

Existing users will login using either email and password, or mobile number and OTP. If they forget their password, they will be able to recover by verifying either email or mobile number.

## 3. Admin Review & Role Assignment

Admins will review new signups, assign roles (Write/creator, reviewer, approver). But there will also be option to set permissions based on designation which will be deep inside to prevent mistakes. Admins can also invite users to sign up using their work email or phone number.

## 4. Main Dashboard

Where users will see everything at a glance that has anything to do with them. The navbar will be dynamic, based on roles. For the user with highest authority/access, will have the navbar with following items:

- Logo
- Dashboard
- Pending Files
- My Files
- All Files
- Notifications (Bell icon only)
- Avatar (Nested items to be displayed in avatar popover: Profile, Account, Admin Panel, Logout)

The navbar should be fixed at the top, collapsed in mobile (with a hamburger menu and bottom sheet to show nav items).

The Dashboard will have the following items in the main page:

Just below the navbar, there should be page title, big search field (on click, it will show the recent files searched), and a "[+] New" button to create new documents.

### 4.1 Awaiting {Task}

Where {task} will be based on roles. For example, if someone is a reviewer, it will show Awaiting Review, if someone is an approver, it will show Awaiting Approval, and so on.

### 4.2 Recent Files

This is where the users will see the files they have interacted with. 

*Note: Consider showing files from "Awaiting {Task}" in Recent Files only if the user has completed their action (reviewed/approved) on that file, to avoid duplicates while maintaining context. Files currently awaiting action should only appear in "Awaiting {Task}" section.*

## 5. Footer

Footer with logo, useful links, and other useful stuff (will decide later) that will be persistent throughout the website.

## 6. Pending Files Page

Upon clicking the "Pending Files" from nav bar will take users to Pending Files page, where they will see the files they dealt with but still pending either for review or approval. If the user has the authority to review or approve, they can do so by opening a file.

## 7. My Files

These are the files the user created themselves and they are the owners, not something they reviewed or approved.

## 8. All Files

This is like a library or a Google-drive like space for the users to browse, search, create new, organize, etc.

## 9. Notifications

Users should be notified on any event that involves them or their documents / actions.

## 10. Admin Panel

Admins should be able to create, invite, or remove any users, change their permissions/access. They should also be able to create templates and set defaults for both Bangla and English language.

## 11. Create New Document

Users can create new documents, where they will have to choose document language between Bangla (default) and English. The document template will by default add the following info:

- **Header** with logo, org name, address, contact, ref no (auto generated), date (current date default but users can change)
- **Subject**
- **Body**: The main content of the document
- **Signature area** (Sign, name, designation, short company name RNPL – all center aligned within the container) to the right
- **Choose department**
- **Choose who to send to** (for review or approval)
- **Send Copies To** (Add, remove, edit the list of people the document will be sent to for information purposes – the formality usually maintained by govt. offices).
- **Attach additional files** (Any format like PDF, DOCX, JPG, PNG, CSV, XLSX, etc).

We'll use an open-source library with MIT license for the document editor, current choice is Tiptap Editor ([GitHub](https://github.com/ueberdosis/tiptap) / [Website](https://tiptap.dev/product/editor)) but it may change later.

## 12. Document Review and Approval Process

After a document is created and submitted, it will go to the person who is responsible for review (chosen during doc creation) and it will no longer be editable. If the document needs any correction/adjustments, the reviewing person can "Return" it to the person who created the file by adding comments (instructing changes) and the creator will be able to edit. After review is done and approved, it will go to the person who will give the final approval. If approved, it will be stored in Approved file list in "All Files".

A changes and events during the life-time of a document must be logged for transparency and auditing purposes.

## 13. Document Viewer

In document viewer, users can view document. There will be action buttons (Approve, Forward, Return) based on the access level of the users. Document viewer will have a sidebar with information like: Ref no, category, status, date, author, attachments, and document log (should be access-based log, doc author should not be able to view logs they are not permitted to), etc.
