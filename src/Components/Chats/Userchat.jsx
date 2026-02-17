import React, { useEffect, useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import Chatstock from "./Chatstock";

//  Image
import DefaultImage from "../../assets/defaultImage.png"

import { GetLeagueMembers } from "../../services/companies.services";
import { fetchUserAllChats } from "../../services/chat.services";

//  Redux
import { useSelector, useDispatch } from "react-redux";

import moment from 'moment';

import _ from 'lodash';

// Component
import { onMessageListener } from '../../firebase.js';

export default function Userchat() {
  const dispatch = useDispatch();
  const [chatID, setChatID] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [searchUserDetail, setSearchUserDetail] = useState(null);
  const [searchLeagueAdmin, setSearchLeagueAdmin] = useState("");
  const [detail, setDetail] = useState([]);
  const [chatUsers, setChatUsers] = useState([]);
  const [lastMessage, setLastMessage] = useState(null);
  const [recepientID, setRecepientID] = useState(null);
  const [newUser, setNewUser] = useState(false);
  const [flag, setFlag] = useState(false);
  const [searchUser, setSearchUser] = useState(false);
  const { loggedUserInfo } = useSelector((state) => state.auth);
  const { allChatsUsers } = useSelector((state) => state.chat);

  const getUserChatDetail = useCallback(() => {
    dispatch(fetchUserAllChats()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    if (newUser) {
      getUserChatDetail();
    }
  }, [newUser, getUserChatDetail]);

  useEffect(() => {
    setChatUsers(allChatsUsers)
  }, [allChatsUsers]);

  useEffect(() => {
    if (searchLeagueAdmin.length > 2) {
      SearchFunc(searchLeagueAdmin)
    } else {
      document.getElementsByClassName('phone')[0].style.display = "none"
    }
  }, [searchLeagueAdmin]);

  const SearchFunc = (search) => {
    (async () => {
      const query = "?search=" + search;
      const response = await GetLeagueMembers(query);
      if (response.status) {
        setDetail(response.data)
        document.getElementsByClassName('phone')[0].style.display = "block"
      }
    })();
  };

  useEffect(() => {
    if (lastMessage && recepientID) {
      setChatUsers((prevChatUsers) => {
        const updatedChatUsers = prevChatUsers.map((item) => {
          if (recepientID === item.id) {
            return {
              ...item,
              last_message: lastMessage
            };
          }
          return item;
        });
        const sortedChatUsers = _.sortBy(updatedChatUsers, [(user) => user.last_message.created_at]);
        return sortedChatUsers.reverse();
      });
    }
  }, [lastMessage, recepientID]);

  useEffect(() => {
    const channel = new BroadcastChannel('background-messages');
    const messageHandler = (event) => {
      const jsonData = JSON.parse(event.data.data.response);
      if (jsonData.notify_type === "chat_message") {
        setRecepientID(jsonData.data.chat_id)
        setLastMessage(jsonData.data)
      }
      setFlag(true);
    };
    channel.addEventListener('message', messageHandler);
    return () => {
      channel.removeEventListener('message', messageHandler);
    };
  }, []);

  onMessageListener()
    .then((payload) => {
      if (flag) {
        setFlag(false)
        return;
      }
      const jsonData = JSON.parse(payload.data.response);
      if (jsonData.notify_type === "chat_message") {
        setRecepientID(jsonData.data.chat_id)
        setLastMessage(jsonData.data)
      }
    })
    .catch((err) => console.error('Foreground message failed:', err));

  const findUser = (searchUserDetail) => {
    for (let index = 0; index < allChatsUsers.length; index++) {
      const id =
        allChatsUsers[index].sender_id === loggedUserInfo?.id
          ? allChatsUsers[index].recepient_id
          : allChatsUsers[index].sender_id;
      if (searchUserDetail.id === id) {
        return allChatsUsers[index].id;
      }
    }
    return null;
  };

  useEffect(() => {
    if (searchUser) {
      const foundChatID = findUser(searchUserDetail);
      if (foundChatID !== null) {
        setChatID(foundChatID);
        setUserDetail(null);
        setSearchLeagueAdmin('');
      } else {
        setUserDetail(searchUserDetail);
        setChatID(null);
        setSearchLeagueAdmin('');
      }
      setSearchUser(false);
    }
  }, [searchUser, searchUserDetail]);

  return (
    <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
      <div className="main-content flex flex-col flex-grow">
        <div className="lg:container lg:mx-auto">
          <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
            <div className="border-r border-gray-300 lg:col-span-1">
              <div className="mx-3 my-3 bg-profile p-[20px] rounded-md">
                <h6 className="mont-serif text-white text-left font-semibold relative bottom-2">Your Messages</h6>
                <div className="relative text-gray-600">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <FaSearch />
                  </span>
                  <input
                    type="search"
                    className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                    name="search"
                    placeholder="Search"
                    value={searchLeagueAdmin}
                    onChange={(e) => {
                      setSearchLeagueAdmin(e.target.value)
                    }}
                  />
                </div>
                <div className="phone" style={{ display: "none" }}>
                  {detail.length > 0 ? (
                    <>
                      {detail.map((item, index) => (
                        <div className="phone_dropdown" key={index}>
                          <p onClick={() => {
                            setSearchUserDetail(item)
                            setSearchUser(true)
                            document.getElementsByClassName('phone')[0].style.display = "none"
                          }}>{item.name} ( {item.company?.name} )</p>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="phone_dropdown">
                      <p>Data Not Available ..</p>
                    </div>
                  )}
                </div>
              </div>
              <ul className="overflow-auto h-[32rem] xxl:h-[29rem]">
                <li>
                  {chatUsers.length > 0 ? (
                    <>
                      {chatUsers.map((item, index) => (
                        <span
                          className={`flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 hover:bg-gray-100 cursor-pointer focus:outline-none ${chatID === item.id ? 'bg-gray-100' : ''
                            }`}
                          key={index}
                          onClick={() => {
                            setChatID(item.id);
                            setUserDetail(null);
                            setSearchLeagueAdmin('');
                          }}
                        >
                          <img
                            className="object-cover w-10 h-10 rounded-full"
                            src={item.avatar ? process.env.REACT_APP_API_IMAGE_URL + item.avatar : DefaultImage}
                            alt="username"
                          />
                          <div className="w-full pb-2">
                            <div className="flex justify-between">
                              <span className="block ml-2 font-semibold text-gray-600 overflow-hidden truncate w-[8rem]">
                                {item.title}
                              </span>
                              {item.last_message.created_at && (
                                <span className="block ml-2 text-sm text-gray-600">
                                  {moment(item.last_message.created_at).format('LT')}
                                </span>
                              )}
                            </div>
                            <span className="block ml-2 text-sm text-gray-600 overflow-hidden truncate w-[16rem]">
                              {item.last_message.message}
                            </span>
                          </div>
                        </span>
                      ))}
                    </>
                  ) : (
                    <span className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer focus:outline-none">
                      <div className="w-full pb-2">
                        <div className="flex justify-between">
                          <span className="block ml-2 font-semibold text-gray-600">
                            No Chat Found
                          </span>
                        </div>
                      </div>
                    </span>
                  )}
                </li>
              </ul>
            </div>
            <div className="hidden lg:col-span-2 lg:block">
              <div className="w-full">
                {(chatID || userDetail) && (
                  <Chatstock id={chatID} img={DefaultImage} userInfo={loggedUserInfo} userDetail={userDetail} setLastMessage={setLastMessage} setChatID={setChatID} setRecepientID={setRecepientID} setChatUsers={setChatUsers} chatUsers={chatUsers} setNewUser={setNewUser} />
                )}
              </div>
            </div>
          </div>
        </div >
      </div >
    </main >
  );
}
