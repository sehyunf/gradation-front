import React, { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useParams } from 'react-router-dom';
import S from './style';

const DisplayContainer = () => {

  const {category} = useParams();
  const [order, setOrder] = useState("date");
  const [cursor, setCursor] = useState(1)
  const [keyword, setKeyword] = useState("")
  const [display, setDisplay] = useState([])
  // 네비게이트로 korea를 default로 보내버림.
  // if(!category) return <Navigate to={"korea"} />

  // 데이터를 한 번에 불러오기
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)


  const params = {
    order : order,
    cursor : cursor,
    category : category || "korean",
    keyword : keyword,
  }

  // useEffect(() => {

  //   const getDisplayList = async () => {
  //     const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/displays/api/list`, {
  //       method : "POST",
  //       headers : {
  //         "Content-Type" : "application/json"
  //       },
  //       body : JSON.stringify(params)
  //     })
  //     if(!response.ok) {
  //       setIsError(true);
  //       throw new Error(`getDisplayList fetch`)
  //     } 
  //     const datas = await response.json()
  //     return datas;
  //   }

  //   getDisplayList()
  //     .then((res) => {
  //       console.log(res)
  //       setDisplay(res.posts)
  //       setIsLoading(false)
  //       setIsError(false)
  //       setHasNextPage(res.posts.length === 15)
  //       if (res.posts.length < 15) {
  //         setMaxCursor(cursor); 
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //       setIsLoading(false)
  //       setIsError(true)
  //     })
  // }, [order, category, cursor, keyword, isUpdate])

  useEffect(() => {
  setCursor(1);
}, [order, category, keyword]);


  return (
    <S.Container>
      <S.Link to="/display/korean">
        <S.EN_H2>display</S.EN_H2>
      </S.Link>
        <Outlet context={{ 
          order, setOrder, 
          cursor, setCursor, 
          keyword, setKeyword, 
          isLoading, isError,
          display
        }}/>
    </S.Container>
  );
};

export default DisplayContainer;