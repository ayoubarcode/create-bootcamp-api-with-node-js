import React, { useEffect, useState, useContext } from 'react';
import CourseBootcamp from './CourseBootcamp';
import BootcampContext from './../../../context/bootcamp/bootcampContext';
import Preload from './../../pages/Preload';
import My404Component from './../../pages/My404Component';

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBView,
  MDBBtn,
  MDBBadge,
  MDBListGroup,
  MDBListGroupItem,
  MDBIcon,
  MDBLink,
} from 'mdbreact';

const Bootcamp = (props) => {
  const bootcmapContext = useContext(BootcampContext);
  const { getSingleBootcamp, current, loading, error } = bootcmapContext;

  useEffect(() => {
    const id = props.match.params.id;
    getSingleBootcamp(id);
  }, []);

  if (loading) {
    return <Preload />;
  }

  if (current === null) {
    return <My404Component />;
  }
  return (
    <MDBContainer className="py-5">
      <MDBRow className="mt-5 mb-4">
        <MDBCol md="8">
          <h1>{current && current.name}</h1>
          <p>{current && current.description}</p>

          {current && current.averageCost && (
            <p className="lead mb-4">
              <span className="text-primary">
                ${current && current.averageCost}
              </span>
            </p>
          )}

          <CourseBootcamp
            courses={current && current.courses ? current.courses : null}
          />
        </MDBCol>
        <MDBCol md="4">
          <MDBView hover zoom>
            <img
              src={current && `http://localhost:5000/uploads/${current.photo}`}
              className="img-fluid"
              alt=""
            />
          </MDBView>
          <div className="text-center mt-1">
            <MDBBtn color="primary" className="btn-block">
              Rating{' '}
              <MDBBadge color="danger" className="ml-2">
                8.8
              </MDBBadge>
            </MDBBtn>
            <a href="reviews.html" class="btn btn-dark btn-block my-3">
              <i class="fas fa-comments" aria-hidden="true"></i> Read Reviews
            </a>

            <MDBLink
              to={`/add-review/${current.id}`}
              class="btn btn-light btn-block my-3"
            >
              <i class="fas fa-pencil-alt" aria-hidden="true"></i> Write a
              Review
            </MDBLink>
            <a
              href="#"
              target="_blank"
              class="btn btn-secondary btn-block my-3"
            >
              <i class="fas fa-globe" aria-hidden="true"></i> Visit Website
            </a>
          </div>
          <MDBListGroup className="py-3">
            <MDBListGroupItem>
              {current && current.housing ? (
                <MDBIcon far icon="check-circle" className="green-text mr-2" />
              ) : (
                <MDBIcon far icon="times-circle" className="red-text mr-2" />
              )}
              Housing
            </MDBListGroupItem>
            <MDBListGroupItem>
              {' '}
              {current && current.jobAssistance ? (
                <MDBIcon far icon="check-circle" className="green-text mr-2" />
              ) : (
                <MDBIcon far icon="times-circle" className="red-text mr-2" />
              )}
              Job Assistance
            </MDBListGroupItem>
            <MDBListGroupItem>
              {' '}
              {current && current.jobGuarantee ? (
                <MDBIcon far icon="check-circle" className="green-text mr-2" />
              ) : (
                <MDBIcon far icon="times-circle" className="red-text mr-2" />
              )}
              Job Guarantee
            </MDBListGroupItem>
            <MDBListGroupItem>
              {' '}
              {current && current.acceptGi ? (
                <MDBIcon far icon="check-circle" className="green-text mr-2" />
              ) : (
                <MDBIcon far icon="times-circle" className="red-text mr-2" />
              )}
              Accepts GI Bill
            </MDBListGroupItem>
          </MDBListGroup>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Bootcamp;
