import React, { Fragment } from 'react';
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
  MDBCardText,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
  MDBIcon,
} from 'mdbreact';
const CourseBootcamp = ({ courses }) => {
  if (courses === null) {
    return <h1> there is no courses yet</h1>;
  }
  return (
    <Fragment>
      {courses &&
        courses.map((course) => (
          <MDBCard style={{ marginTop: '1rem' }} key={course._id}>
            <MDBCardHeader
              color="warning-color-dark
"
              tag="h3"
            >
              {course.title}
            </MDBCardHeader>
            <MDBCardBody>
              <MDBCardTitle>Duration: {course.weeks} weeks</MDBCardTitle>
              <MDBCardText>{course.description}</MDBCardText>
              <MDBListGroup>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                  Cost :
                  <MDBBadge color="peach-gradient" pill>
                    ${course.tuition} USD
                  </MDBBadge>
                </MDBListGroupItem>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                  Skill Required :
                  <MDBBadge color="peach-gradient" pill>
                    {course.minimumSkill}
                  </MDBBadge>
                </MDBListGroupItem>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                  Scholarship Available
                  <MDBBadge color="peach-gradient" pill>
                    {course.scholarhipsAvailable ? (
                      <MDBIcon
                        icon="check"
                        size="2x"
                        className="green-text pr-3 text-center"
                      />
                    ) : (
                      <MDBIcon
                        icon="times-circle"
                        size="2x"
                        className="red-text pr-3 text-center"
                      />
                    )}
                  </MDBBadge>
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBCardBody>
          </MDBCard>
        ))}
    </Fragment>
  );
};

export default CourseBootcamp;
