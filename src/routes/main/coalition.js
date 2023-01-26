/*
작성자 서종현
작성일 23.01.26.
제휴제공 게시판
*/

import { useEffect, useState } from "react"
import axios from "axios"
import Board from "../../component/board"
import './css/coalition.css'
import BoardPostForm from "../../component/boardPostForm"
import { Link } from "react-router-dom";

import DummyCoalition from '../../dummy/dummyCoalition'

function Coalition() {

    // 게시판 게시글 상단 머리글
    const [ indexs, setIndexs ] = useState([])
    // 서버에서 받아온 게시판 글
    const [ coalitionPosts, setCoalitionPosts ] = useState([])
    // 사용자가 작성한 게시글
    const [ inputBuffer, setInputBuffer ] = useState([])

    // 더미데이터 입력
    useEffect(() => {
        setIndexs(["글번호", "제휴규모", "제공기업", "제목"])
        setCoalitionPosts(DummyCoalition)

        // axios({
        //     url: 'https://jsonplaceholder.typicode.com/posts?userId=1',
        //     method: "GET"
        // })
        //     .then(res => setCoalitionPosts(res.data))
        //     .catch(err => console.log(err))
        
    }, [])

    // 사용자 작성 페이지 전송
    function onSubmit() {

        axios({
            url: 'https://jsonplaceholder.typicode.com/posts',
            method: "POST",
            data: JSON.stringify(inputBuffer),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(res => {
                console.log(res.data)
                setCoalitionPosts(prev => [...prev, inputBuffer])
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="coalition_outterBox">
            <h1 className="coalition_headline">
                제휴제공 게시판
            </h1>
            {Board(indexs, coalitionPosts)}
            <h1 className="coalition_headline">
                제휴제공 포스트 작성
            </h1>
            {BoardPostForm(["글번호", "제휴규모", "제공기업", "제목"], setInputBuffer)}
            <div className="coalition_btnBox">
                <Link to={"/"}>
                    <button className="coalition_btn">뒤로가기</button>
                </Link>
                <button className="coalition_btn" onClick={onSubmit}>작성완료</button>
            </div>
        </div>
    )
}

export default Coalition