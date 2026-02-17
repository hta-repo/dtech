
import React, { useEffect, useState, useRef } from "react";
import ImageViewer from 'react-simple-image-viewer';

import { GetChat, SendMessage } from "../../services/chat.services";

import { AiOutlineClose } from "react-icons/ai";
import PDF from "../../assets/pdf.png"

import { onMessageListener } from '../../firebase.js';

//  Loader
import Spinner from "../Spinner/Spinner";

import moment from 'moment';

function Chatstock(props) {
  const messagesRef = useRef(null);
  const [data, setData] = useState({});
  const [message, setMessage] = useState([]);
  const [writeMessage, setWriteMessage] = useState("");
  const [writeMessageLoading, setWriteMessageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userChatID, setUserChatID] = useState(null);
  const [images, setImages] = useState([]);

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const [viewimages, setviewImages] = useState([]);

  useEffect(() => {
    const channel = new BroadcastChannel('background-messages');
    const messageHandler = (event) => {
      const jsonData = JSON.parse(event.data.data.response);
      props.setRecepientID(jsonData.data.chat_id)
      props.setLastMessage(jsonData.data)

      if (props.userDetail) {
        if (props.userDetail.id === jsonData.data.user_id) {
          setMessage(prevArray => [...prevArray, jsonData.data]);
        }
      } else {
        if (props.id === jsonData.data.chat_id) {
          setData((prevData) => ({
            ...prevData,
            messages: [...(prevData.messages || []), jsonData.data],
          }));
        }
      }
      setFlag(true);
      // console.log(jsonData, 'jsonData background message in Chatstock');
    };
    channel.addEventListener('message', messageHandler);
    return () => {
      channel.removeEventListener('message', messageHandler);
    };
  }, [props]);

  onMessageListener()
    .then((payload) => {
      if (flag) {
        setFlag(false)
        return;
      }
      const jsonData = JSON.parse(payload.data.response);
      // console.log(jsonData, 'jsonData forground message in Chatstock chatstock');
      if (jsonData.notify_type === "chat_message") {
        props.setRecepientID(jsonData.data.chat_id)
        props.setLastMessage(jsonData.data)

        if (props.userDetail) {
          if (props.userDetail.id === jsonData.data.user_id) {
            setMessage(prevArray => [...prevArray, jsonData.data]);
          }
        } else {
          if (props.id === jsonData.data.chat_id) {
            setData({
              ...data,
              messages: [...data.messages, jsonData.data]
            });
          }
        }
      }
    })
    .catch((err) => console.error('Foreground message failed:', err));

  useEffect(() => {
    if (props.userDetail) {
      if (props.id === null) {
        setLoading(false)
        setData({})
        setUserChatID(null)
        setMessage([])
      }
    } else {
      (async () => {
        setLoading(true)
        const response = await GetChat(props.id);
        if (response.status) {
          setData(response.data)
          setUserChatID(response.data.id)
        }
        setMessage([])
        setLoading(false)
      })();
    }
  }, [props.id, props.userDetail]);

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [data]);

  const sendMessage = (e) => {
    (async () => {
      e.preventDefault();
      setWriteMessageLoading(true)
      const formData = new FormData();

      if (userChatID) {
        if (props.userDetail) {
          formData.append("recepient_id", props.userDetail.id);
        } else {
          formData.append("recepient_id", data.sender_id === props.userInfo.id ? data.recepient_id : data.sender_id);
        }
        formData.append("chat_id", userChatID);
      }
      else {
        formData.append("recepient_id", props.userDetail.id);
      }
      formData.append("message", writeMessage)

      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          formData.append("attachments[]", images[i])
        }
      }

      const response = await SendMessage(formData);
      if (response.status) {

        if (props.userDetail) {

          const chatHeadObject = response.data.chat_head;
          setUserChatID(response.data.chat_id)
          if (message.length === 0) {
            props.setChatUsers(prevArray => [...prevArray, chatHeadObject]);
            props.setNewUser(true)
          }
          props.setChatID(response.data.chat_id)
          setMessage(prevArray => [...prevArray, response.data]);
          props.setRecepientID(response.data.chat_id)
          props.setLastMessage(response.data)
          setImages([])

        } else {
          setData({
            ...data,
            messages: [...data.messages, response.data]
          });
          props.setRecepientID(data.id)
          props.setLastMessage(response.data)
          setImages([])
        }
      }
      setWriteMessage("")
      setWriteMessageLoading(false)
    })();
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const updatedFiles = [...images];

    for (let i = 0; i < files.length; i++) {
      updatedFiles.push(files[i]);
    }
    setImages(updatedFiles);
  };

  const handleImageDelete = (index) => {
    const updatedFiles = [...images];
    updatedFiles.splice(index, 1);
    setImages(updatedFiles);
  };

  function getMimeType(file) {
    const mimeType = file.substring(file.lastIndexOf('.') + 1);
    return mimeType;
  }
  const acceptedImageTypes = ["jpeg", "jpg", "png", "gif", /* Add more if needed */];

  const openImageViewer = (index, file) => {
    setviewImages([file]);
    setCurrentImage(index);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center mt-[2rem]">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="relative flex items-center p-3 border-b border-gray-300 bg-profile ">
            <img
              className="object-cover w-10 h-10 rounded-full"
              src={
                props.userDetail
                  ?
                  props.userDetail.avatar ? process.env.REACT_APP_API_IMAGE_URL + props.userDetail.avatar : props.img
                  :
                  data.recepient_id === props.userInfo.id
                    ?
                    data.sender?.avatar ? process.env.REACT_APP_API_IMAGE_URL + data.sender?.avatar : props.img
                    :
                    data.recepient?.avatar ? process.env.REACT_APP_API_IMAGE_URL + data.recepient?.avatar : props.img
              }
              alt="username"
            />
            <span className="block ml-2 font-bold text-gray-600">
              {
                props.userDetail
                  ?
                  props.userDetail.name
                  :
                  data.recepient_id === props.userInfo.id
                    ?
                    data.sender?.name
                    :
                    data.recepient?.name
              }
            </span>
            <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
          </div>
          <div className="relative w-full overflow-y-auto h-[65vh]" ref={messagesRef}>
            <div className="space-y-2 p-6">
              {data.messages?.map((item, index) => (
                <div key={index}>
                  {item.user_id === props.userInfo?.id ? (
                    <>
                      {item.attachments && item.attachments.length > 0 && (
                        <li className="flex justify-end fade-in-right mt-[7px]">
                          <div className="flex flex-wrap w-[120px] pb-[12px]">
                            {item.attachments?.map((val, index) => (
                              <>
                                {acceptedImageTypes.includes(getMimeType(val.file).toLowerCase()) ? (
                                  <div key={index} className="mt-[12px] cursor-pointer">
                                    <img
                                      src={process.env.REACT_APP_API_IMAGE_URL + val.file}
                                      onClick={() => openImageViewer(index, process.env.REACT_APP_API_IMAGE_URL + val.file)}
                                      className="h-[120px] w-[120px] rounded-lg"
                                      key={index}
                                      alt={val.file}
                                    />
                                  </div>
                                ) : (
                                  <a href={process.env.REACT_APP_API_IMAGE_URL + val.file} target="_blank" key={index} rel="noreferrer" className="mt-[12px]">
                                    <img
                                      src={PDF}
                                      alt={PDF}
                                      className="h-[120px] w-[120px] rounded-lg"
                                    />
                                  </a>
                                )}
                              </>
                            ))}
                          </div>
                        </li>
                      )}
                      {item.message && (
                        <div className="flex justify-end fade-in-right">
                          <div className="relative max-w-xl px-4 py-2 text-white rounded bg-receiver-bg">
                            <span className="block">{item.message}</span>
                          </div>
                        </div>
                      )}
                      <div className="flex justify-end text-[11px]">{moment(item.created_at).format('LT')}</div>
                    </>
                  ) : (
                    <>
                      {item.attachments && item.attachments.length > 0 && (
                        <li className="flex justify-start fade-in-left mt-[7px]">
                          <div className="flex flex-wrap w-[120px] pb-[12px]">
                            {item.attachments?.map((val, index) => (
                              <>
                                {acceptedImageTypes.includes(getMimeType(val.file).toLowerCase()) ? (
                                  <div key={index} className="mt-[12px] cursor-pointer">
                                    <img
                                      src={process.env.REACT_APP_API_IMAGE_URL + val.file}
                                      onClick={() => openImageViewer(index, process.env.REACT_APP_API_IMAGE_URL + val.file)}
                                      className="h-[120px] w-[120px] rounded-lg"
                                      key={index}
                                      alt={val.file}
                                    />
                                  </div>
                                ) : (
                                  <a href={process.env.REACT_APP_API_IMAGE_URL + val.file} target="_blank" key={index} rel="noreferrer" className="mt-[12px]">
                                    <img
                                      src={PDF}
                                      alt={PDF}
                                      className="h-[120px] w-[120px] rounded-lg"
                                    />
                                  </a>
                                )}
                              </>
                            ))}
                          </div>
                        </li>
                      )}
                      {item.message && (
                        <div className="flex justify-start fade-in-left">
                          <div className="relative bg-sender-bg max-w-xl px-4 py-2 text-gray-700 rounded">
                            <span>{item.message}</span>
                          </div>
                        </div>
                      )}
                      <div className="flex justify-start text-[11px]">{moment(item.created_at).format('LT')}</div>
                    </>
                  )}
                </div>
              ))}
              {message.length > 0 && (
                <>
                  {message?.map((val, index) => (
                    <div key={index}>
                      {val.user_id !== props.userDetail?.id ? (
                        <>
                          {val.attachments && val.attachments.length > 0 && (
                            <li className="flex justify-end fade-in-right mt-[7px]" key={index}>
                              <div className="flex flex-wrap w-[120px] pb-[12px]">
                                {val.attachments?.map((val, index) => (
                                  <>
                                    {val.file_type === "application/pdf" ? (
                                      <a href={process.env.REACT_APP_API_IMAGE_URL + val.file} target="_blank" rel="noreferrer" key={index} className="mt-[12px]">
                                        <img
                                          src={PDF}
                                          alt={PDF}
                                          className="h-[120px] w-[120px] rounded-lg"
                                        />
                                      </a>
                                    ) : (
                                      <div key={index} className="mt-[12px]">
                                        <img
                                          src={process.env.REACT_APP_API_IMAGE_URL + val.file}
                                          alt={val.file}
                                          className="h-[120px] w-[120px] rounded-lg"
                                        />
                                      </div>
                                    )}
                                  </>
                                ))}
                              </div>
                            </li>
                          )}
                          {val.message && (
                            <div className="flex justify-end fade-in-right">
                              <div className="relative max-w-xl px-4 py-2 text-white rounded bg-receiver-bg">
                                <span>{val.message}</span>
                              </div>
                            </div>
                          )}
                          <div className="flex justify-end text-[11px]">{moment(val.created_at).format('LT')}</div>
                        </>
                      ) : (
                        <>
                          {val.attachments && val.attachments.length > 0 && (
                            <li className="flex justify-start fade-in-left mt-[7px]" key={index}>
                              <div className="flex flex-wrap w-[120px] pb-[12px]">
                                {val.attachments?.map((val, index) => (
                                  <>
                                    {val.file_type === "application/pdf" ? (
                                      <a href={process.env.REACT_APP_API_IMAGE_URL + val.file} target="_blank" rel="noreferrer" key={index} className="mt-[12px]">
                                        <img
                                          src={PDF}
                                          alt={PDF}
                                          className="h-[120px] w-[120px] rounded-lg"
                                        />
                                      </a>
                                    ) : (
                                      <div key={index} className="mt-[12px]">
                                        <img
                                          src={process.env.REACT_APP_API_IMAGE_URL + val.file}
                                          alt={val.file}
                                          className="h-[120px] w-[120px] rounded-lg"
                                        />
                                      </div>
                                    )}
                                  </>
                                ))}
                              </div>
                            </li>
                          )}
                          {val.message && (
                            <div className="flex justify-start fade-in-left">
                              <div className="relative bg-sender-bg max-w-xl px-4 py-2 text-gray-700 rounded">
                                <span>{val.message}</span>
                              </div>
                            </div>
                          )}
                          <div className="flex justify-start text-[11px]">{moment(val.created_at).format('LT')}</div>
                        </>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {images.length > 0 && (
            <div className="absolute bg-gray-100 w-[100vh] p-[10px] overflow-y-auto h-[25vh] mx-[20px] bottom-[8rem]">
              <div className="flex flex-row space-x-4">
                {images.map((file, index) => (
                  <>
                    <div key={index} style={{ position: "relative" }}>
                      <AiOutlineClose
                        onClick={() => handleImageDelete(index)}
                        style={{
                          position: "absolute",
                          color: "#fff",
                          background: "#ED1C22",
                          cursor: "pointer",
                          fontSize: "20px",
                          right: "0"
                        }}
                      />
                      <img
                        src={file.type === "application/pdf" ? PDF : URL.createObjectURL(file)}
                        alt={file.name}
                        className="h-[140px] w-[140px] rounded-lg"
                      />
                    </div>
                  </>
                ))}
              </div>
            </div>
          )}
          <form onSubmit={sendMessage}>
            <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
              <div>
                <label htmlFor="uploadImage">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-500 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </label>
                <input
                  hidden
                  accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                  multiple
                  type="file"
                  id="uploadImage"
                  onChange={handleImageUpload}
                />
              </div>
              <input
                type="text"
                placeholder="Message"
                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message"
                disabled={writeMessageLoading}
                value={writeMessage}
                onChange={(e) => setWriteMessage(e.target.value)}
              />
              <button type="submit" disabled={images.length === 0 && writeMessage.length === 0}>
                {writeMessageLoading ? <Spinner /> :
                  <svg
                    className="w-7 h-7 text-gray-500 origin-center transform rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                }
              </button>
            </div>
          </form>
        </>
      )
      }
      {isViewerOpen && (
        <ImageViewer
          src={viewimages}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </>
  )
}

export default Chatstock




