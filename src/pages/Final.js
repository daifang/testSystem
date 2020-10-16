import React, { Component } from 'react';
import Axios from 'axios' ;
import '../css/Final.css';
//期末测试页
export default class Final extends Component {
    constructor(){
        super();
        this.state = {
            data : {
                good:true
            },
            num : 0
        }
    }
    getData = () => {
        Axios({
            method:'post',
            data: {
                course_id :JSON.parse(localStorage.getItem('userInfo')).course_id
            },
            headers:{
                Authorization:localStorage.getItem('userId')
            },
            url:'/api/student/examination/getFinalExamSimpleInfo'
        }).then((response) => {
            // console.log(response);
            if(response.data.status == 40301){
                alert('登录过期,重新登陆');
                localStorage.setItem('userId','');
                window.location.hash = '/';
            }else{
                this.setState({
                    data: response.data.data?response.data.data:{radio_select_num:0,multi_select_num:0,judge_question_num:0,good:true}
                },()=>{
                    this.setState({
                        num : this.state.data.radio_select_num+this.state.data.multi_select_num+this.state.data.judge_question_num
                    })
                })
            }
        })
    }
    componentDidMount(){
        document.title = '期末测试';
        this.getData();
        // console.log(JSON.parse(localStorage.getItem('userInfo')).course_id);
        
    }
    render() {
        if(!this.state.data.good){
            return (
                <div className="animated slideInRight" 
                    onTouchEnd ={(e)=>{
                        e.stopPropagation();
                        this.goToTest(e);
                    }}
                    id={this.state.data.begin_time}
                >
                    <div id="content" className="content"
                                            onTouchEnd ={(e)=>{
                                                e.stopPropagation();
                                                this.goToTest(e);
                                            }}
                    >
                    <div 
                        className="title"
                        onTouchEnd ={(e)=>{
                            e.stopPropagation();
                            this.goToTest(e);
                        }}
                        id={this.state.data.begin_time}
                    >{this.state.data.page_name}</div>
                    <div 
                        className="masege"
                        onTouchEnd ={(e)=>{
                            e.stopPropagation();
                            this.goToTest(e);
                        }}    
                        id={this.state.data.begin_time}
                    >1.考试时间为{this.state.data.answer_time},满分为{this.state.data.full_score}分</div>
                    <div 
                        className="masege2"
                        onTouchEnd ={(e)=>{
                            e.stopPropagation();
                            this.goToTest(e);
                        }}    
                        id={this.state.data.begin_time}
                    >2.题目数量：单选题{this.state.data.radio_select_num}道，多选题{this.state.data.multi_select_num}道，判断题{this.state.data.judge_question_num}道，共计{this.state.num}道题。</div>
                    </div>
                </div>
            )
        }else{
            return(
                <div style={{width:'100%',height:'30%',fontSize:'25px',marginTop:'30%'}} className="animated slideInRight">
                    <img src='/exam/none.png' style={{
                        transform:'scale(0.9)',
                        position:'absolute',
                        top:'0%',
                        left:'-15%'
                    }}/>
                </div>
            )
        }
    }
    goToTest = (e)=>{
        localStorage.setItem('time',this.state.data.answer_time*60);
        let test_time = this.state.data.answer_time*60000;//分钟
        localStorage.setItem('examTime',test_time);
        let date = e.target.id.split(' ')[0].split('-').concat(e.target.id.split(' ')[1].split(':'));//考试时间
        // console.log(date);
        date.map(val=>{
            val = val*1;
        })
        let create_sec = (Date.UTC(date[0],date[1],date[2],date[3],date[4],date[5]));//创造时间
        localStorage.setItem('create_time',create_sec);
        localStorage.setItem('finalTest',JSON.stringify(this.state.data));
        if(localStorage.getItem('testTime') != null){
            localStorage.setItem('testTime',localStorage.getItem('testTime'));
        }else{
            localStorage.setItem('testTime',0);
        }
        window.location.hash = 'test/'+this.state.data.page_id+"$"+this.state.data.id+"&"+"final";
    }
    goTo = (e)=>{
        window.location.hash = 'Section/'+e.target.id;
    }

}
