import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as S from '../../style';

const Comment = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:10000/comments/api/list/${currentUser.id}`);
        // http://localhost:10000/comments/api/list/7
        if (!response.ok) throw new Error('서버 응답 실패');
        const data = await response.json();
        setComments(data.commentList);
      } catch (error) {
        console.error('댓글 목록 불러오기 실패:', error);
      }
    };

    fetchComments();
  }, [currentUser]);

  return (
    <S.MainWrapper>
      <S.Wrapper>
        {/* 리스트 헤더 */}
        <S.ListHeader>
          <S.Number>번호</S.Number>
          <S.Category>작품명</S.Category>
          <S.Emptybox></S.Emptybox>
          <S.Title>내 댓글</S.Title>
          <S.Emptybox>작성일</S.Emptybox>
        </S.ListHeader>

        {/* 댓글 목록 */}
        {comments.length > 0 ? (
          comments.map((comment, idx) => (
            <S.ContentBox key={comment.id || idx}>
              <S.Number>{idx + 1}</S.Number>
              <S.Category>{comment.artTitle || '작품명 없음'}</S.Category>
              <S.Emptybox></S.Emptybox>
              <S.TitleNavigate to={`/display/detail/${comment.artId}`} >
                <S.Content>{comment.commentContent || '댓글 내용 없음'}</S.Content>
              </S.TitleNavigate>
              <S.Emptybox>{new Date(comment.commentDate|| '-').toLocaleDateString('ko-KR')}</S.Emptybox>
            </S.ContentBox>
          ))
        ) : (
          <div style={{ padding: "1rem", textAlign: "center" }}>작성한 댓글이 없습니다.</div>
        )}
      </S.Wrapper>
    </S.MainWrapper>
  );
};

export default Comment;
