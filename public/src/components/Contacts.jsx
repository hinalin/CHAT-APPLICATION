import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo1.png";
import Logout from "./Logout";


export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h2>snaptalk</h2>
            </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
            <Logout className='logout' />
           

          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 15% 70% 15%;
  overflow: hidden;
  background-color: #080420;
 
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 6rem;
    }
    h2 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: gray;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3.5rem;
        }
      }
      .username {
        h3 {
          color: black;
          font-size:1.5rem;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
    // @media screen and (max-width: 640px) {
    //   .avatar {
    //     img {
    //       height: 3rem;
    //     }
    //   }
    //   .username {
    //     h3 {
    //       color: black;
    //       font-size:0.8rem;
    //     }
    //   }
    // }
    // @media screen and (min-width: 641px) and (max-width: 1080px) {
    //   .avatar {
    //     img {
    //       height: 3.5rem;
    //     }
    //   }
    //   .username {
    //     h3 {
    //       color: black;
    //       font-size:1.2rem;
    //     }
    //   }
    // }
   
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 0 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (max-width: 640px) {
      .avatar {
        img {
          height: 3rem;
          max-inline-size: 100%;
        }
      }
      .username {
        h2 {
          color: white;
          font-size:0.8rem;
        }
      }
    }
    @media screen and (min-width: 641px) and (max-width: 1080px) {
      .avatar {
        img {
          height: 4rem;
          max-inline-size: 100%;
        }
      }
      .username {
        h2 {
          color: white;
        }
      }
    }
   
   }


  //  @media screen and (max-width: 640px) {
  //   .brand {
  //     h2 {
  //       font-size: 1rem;
  //     }
  //   }
  //   .contacts .contact .avatar img {
  //     height: 2rem; /* 
  //   }
  //   .contacts .contact .username h3 {
  //     font-size: 1rem; 
  //   }
  //   .current-user .avatar img {
  //     height: 3rem;
  //   }
  //   .current-user .username h2 {
  //     font-size: 1rem;
  //   }
  // }
  
  // @media screen and (min-width: 641px) and (max-width: 1080px) {}

  // @media screen and (min-width: 1081px) {
  // }
`;
