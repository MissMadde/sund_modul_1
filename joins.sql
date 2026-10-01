
-- SKILL 2 --

-- 1, Which columns in cd.bookings are foreign keys, and which tables do they point to?

-- Answer: In cd.bookings, the facid- and memid columns are foreign keys where 
-- facid points to cd.facilities and memis points to cd.members.

-- 2, What kind of relationship is there between members and facilities ? Which table plays the role
-- of the junction table, like student_courses in the video?

-- Answer: The relation is many-to-many because one member can book a lot of facilities and a 
-- facility can have a lot of bookings from more than one member. And the cd.bookings is the junction table.


-- 3, The recommendedby column in cd.members points back to cd.members itself. What kind of
-- relationship is that?

-- Answer: It is called a self-referencing relationship. 
-- Its when one column points back to its own table.




--  SKILL 3 --

-- 1, Retrieve the start times of members' bookings --
SELECT b.starttime
FROM cd.bookings b
JOIN cd.members m ON b.memid = m.memid
WHERE m.firstname = 'David' AND m.surname = 'Farrell'



-- 2, Work out the start times of bookings for tennis courts --
SELECT b.starttime, f.name
FROM cd.bookings b
INNER JOIN cd.facilities f ON b.facid = f.facid
WHERE f.name LIKE 'Tennis Court%'
AND b.starttime >= '2012-09-21'
AND b.starttime < '2012-09-22'
ORDER BY b.starttime;



-- 3, Produce a list of all members who have recommended another member
SELECT DISTINCT recs.firstname, recs.surname
FROM cd.members mems
JOIN cd.members recs ON recs.memid = mems.recommendedby
ORDER BY surname, firstname; 


-- 4, Produce a list of all members, along with their recommender
SELECT 
mems.firstname AS member_firstname,
mems.surname AS member_surname, 
recs.firstname AS recommender_firstname,
recs.surname AS recommender_surname
FROM cd.members mems
LEFT OUTER JOIN cd.members recs 
ON recs.memid = mems.recommendedby
ORDER BY mems.surname, mems.firstname;


-- 5, Produce a list of all members who have used a tennis court
SELECT DISTINCT 
m.firstname || ' ' || m.surname AS member_name, 
f.name AS facility_name
FROM cd.bookings b
INNER JOIN cd.members m ON b.memid = m.memid
INNER JOIN cd.facilities f ON b.facid = f.facid
WHERE f.name LIKE 'Tennis Court%'
ORDER BY member_name, facility_name;


-- 6, Produce a list of costly bookings
SELECT 
m.firstname || ' ' || m.surname AS member,
f.name AS facility,
CASE 
WHEN b.memid = 0 THEN b.slots * f.guestcost
ELSE b.slots * f.membercost
END AS cost
FROM cd.bookings b
JOIN cd.members m ON b.memid = m.memid
JOIN cd.facilities f ON b.facid = f.facid
WHERE b.starttime >= '2012-09-14' 
AND b.starttime < '2012-09-15'
AND (
CASE 
WHEN b.memid = 0 THEN b.slots * f.guestcost
ELSE b.slots * f.membercost
END > 30
)
ORDER BY cost DESC;


-- 7, Produce a list of all members, along with their recommender, using no joins.
SELECT DISTINCT 
m1.firstname || ' ' || m1.surname AS member,
(
SELECT m2.firstname || ' ' || m2.surname 
FROM cd.members m2 
WHERE m2.memid = m1.recommendedby
) AS recommender
FROM cd.members m1
ORDER BY member;


-- 8, Produce a list of costly bookings, using a subquery
SELECT member, facility, cost
FROM (
SELECT 
m.firstname || ' ' || m.surname AS member,
f.name AS facility,
CASE 
WHEN b.memid = 0 THEN b.slots * f.guestcost
ELSE b.slots * f.membercost
END AS cost
FROM cd.bookings b
INNER JOIN cd.members m ON b.memid = m.memid
INNER JOIN cd.facilities f ON b.facid = f.facid
WHERE b.starttime >= '2012-09-14' 
AND b.starttime < '2012-09-15'
) AS sub
WHERE cost > 30
ORDER BY cost DESC;

-- In this last task it was more logic to me to start with looking at the bookings, 
-- then take the member and what facility, instead of the solution in the program:
-- take the members, connect them to the bookings and then look at the facilities.