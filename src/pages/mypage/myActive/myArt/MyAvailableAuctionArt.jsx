import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as S from '../../style';
import * as SA from './myAvailableAuctionArtStyle';
import { useSelector } from 'react-redux';

const MyAvailableAuctionArt = () => {
  const [auctionArts, setAuctionArts] = useState([]);
  const currentUser = useSelector(state => state.user.currentUser);

  useEffect(() => {
    if (!currentUser?.id) return;

    const fetchAuctionArts = async () => {
      try {
        const response = await fetch(`http://localhost:10000/displays/api/list/auction?userId=${currentUser.id}`);
        if (!response.ok) throw new Error('서버 응답 실패');
        const data = await response.json();
        setAuctionArts(data.artListForAuction);
      } catch (error) {
        console.error('경매 가능 작품 불러오기 실패:', error);
      }
    };

    fetchAuctionArts();
  }, [currentUser]);

  return (
    <S.MainWrapper>
      <S.Wrapper>
        {/* 리스트 헤더 */}
        <S.ListHeader>
          <S.Number>번호</S.Number>
          <S.Category>구분</S.Category>
          <S.Emptybox></S.Emptybox>
          <S.Title>작품명</S.Title>
          <S.Emptybox></S.Emptybox>
        </S.ListHeader>

        {/* 리스트 배열 */}
        {auctionArts.length > 0 ? (
          auctionArts.map((art, index) => (
            <SA.ContentBox key={art.id || index}>
              <S.Number>{index + 1}</S.Number>
              <S.Category>{art.artCategory}</S.Category>
              <S.Emptybox></S.Emptybox>
              <S.TitleNavigate as={NavLink} to={`/display/detail/${art.id}`} end>
                <S.Content>{art.artTitle}</S.Content>
              </S.TitleNavigate>
              <S.Emptybox>
                <S.Button120x45R onClick={() => window.location.href = '/auction/bidding'}>경매 등록</S.Button120x45R>
              </S.Emptybox>
            </SA.ContentBox>
          ))
        ) : (
          <SA.NoneText>경매 가능 작품이 없습니다.</SA.NoneText>
        )}
      </S.Wrapper>
    </S.MainWrapper>
  );
};

export default MyAvailableAuctionArt;
