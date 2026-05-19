main.jsx file:
readHashPath - function can replace hash and cause route mismatch.

useEffect on unmount removes callback function instead of actual onHasChange function

(potential issue) currentRoute - if route is not found, it redirects to Dashboard page, but probably should lead to 404 page

in navigation sections links use label and index instead of unique path value for key

mobile sidebar has no backdrop click handler

(potential issue) header sits on top of sidebar navigation on mobile

aria-label for menu is always Open-menu, even if it's already open

Hash routing has no focus management on route change (e.g. move focus to main content).



PageHeader:
uses div instead of header element



Dashboard page:
search value is not set to lowerCase. Projects names are, but search itself - no. (it is implemented on Projects page)

Avg health is hardcoded, should be dynamic like any other data

project's health doesn't have empty state so it might show just "%"

textarea is uncontrolled and is not inside the form

first (0 index) StatCard won't have a good classname



BuggyModel:
doesn't have remover for Escape key event listener

Clicks on modal doesn't have .stopPropagation, so events are passed to backdrop

no scroll lock on document.body, so when modal is opened, user can scroll down, leaving navigation

Dialog lacks aria-labelledby / aria-describedby; close control is only “x” with no accessible name

autoFocus on the inner input can fight focus management and hurt keyboard users



Projects page:
in navigation Projects and Billing have the same icon

selected can contain duplicate IDs under fast clicks (no toggle/dedupe logic)

Сheckbox toggle only appends IDs; it never removes them, so rows cannot be unchecked

useMemo omits search from the dependency array, so filtering can be stale after search changes

Table rows use index as key instead of project.id

No empty state when filters return no rows

Toolbar does not expose sort direction (asc/desc) to users



Team page:
removeMember mutates state with splice then calls setMembers(members) — breaks React immutability and can cause missed updates

Does not use the global search prop

Capacity above 100% (e.g. 107%) is shown without capping or warning styling

(potential issue) Better to add confirmation modal for Remove

"Show inactive" checkbox is uncontrolled - does onChange, but doesn't have value



Reports page:
Chart bars are <button> elements with no action — can take focus with no point

maxRevenue is hardcoded (70000)

chart scale breaks if data changes

Chart accessibility is minimal (aria-label only); no text alternative tied to the table



Billing page:
Discount is subtracted as a string (total - discount), can cause NaN or string concatenation result

no validation or parsing for discount (negative, non-numeric, etc.)

“Toggle” button label is vague for assistive tech



Settings page:
onChanges and value props are missing on a lot of select/inputs, etc.

timezone and email preferences never update state or persist

save doesn't store anything, just shows toast. Toast's text implies that



Support page:
No validation for an empty title on the ticket

new ticket's priority is hardcoded to Low

index is used as a key which can cause issues when reordering

prose prose-2xl makes help copy disproportionately large compared to the rest of the app

No way to edit, resolve, or delete tickets



CSS issues:
.oversized-panel { min-width: 720px } forces horizontal overflow on many laptop/mobile widths. It's not needed

.data-table { min-width: 760px } causes horizontal scroll inside panels on small screens

Global outline: none on focus removes visible focus for keyboard users

Overly specific rule .main-area .page-frame .panel button:not(.modal-close) makes overrides harder

Styling is split unevenly: most UI in SCSS, Tailwind + typography plugin only on Support — inconsistent and harder to maintain

Inter is referenced in CSS but not loaded (font fallback only)

Dark theme styles omit .modal-card (stays light) and some surfaces may have weak contrast

At max-width: 520px, search is forced to 140px — too narrow for usable search

Mobile layout: stats, two-column grids, and invoice cards stack, but several grids still fight min-widths

No prefers-reduced-motion handling for sidebar transition

Duplicate/conflicting concerns between broken-layout.css and global.scss



Stuff to make a website better:
add a favicon and meta tags

Tables lack <th scope="col"> (or row headers where needed)

Status conveyed mainly by color (pills, danger rows, trend colors) without extra text/icons

No live region for save toast or dynamic list updates