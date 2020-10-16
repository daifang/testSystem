import Axios from 'axios';
import React, { Component } from 'react'
import '../css/sets.css';
//设置页
export default class Sets extends Component {
    constructor(){
        super();
        this.state = {
            option : ['1','2','3'],
            id:JSON.parse(localStorage.getItem('userInfo')).course_id
        }
    }
    componentDidMount(){
        document.title = '设置';
        Axios({
            url:'/api/student/videoCourseManage/findCourseListOfStudent',
            method:'POST',
            headers:{
                Authorization:localStorage.getItem('userId')
            }
        }).then(res=>{
            // console.log(res);
            if(res.data.status == 40301){
                localStorage.setItem('userId','');
                window.location.hash = '/';
            }else{
                this.setState({
                    option:res.data.data
                })
            }
        }).catch((e)=>
            console.log(e)
        );
    }
    render() {
        return (
            <div className = 'slideInRight animated'>
                {/* <div style={{
                    fontSize:'20px',
                    marginTop:'10px',
                    marginLeft:'45%',
                    paddingBottom:'25px'
                }}>
                    设置
                </div> */}
                <div id = 'sets' >
                    <div onClick = {()=>{this.goTo('/change/tel')}}>
                    <span style={{textIndent:'10px',display:'block',float:'left',fontSize:'17px'}}>修改手机号</span>
                        <img src = '/exam/right.png'/>
                    </div>
                    <div onClick = {()=>{this.goTo('/change/password')}}>
                        <span style={{textIndent:'10px',display:'block',float:'left',fontSize:'17px'}}>修改登录密码</span>
                        <img src = '/exam/right.png'/>
                    </div>
                    <div>
                        <select 
                            onChange = {(e)=>{
                                this.changeCourse(e,'/api/student/studentCourseSelectRecord/changeCourse');
                            }}
                            defaultValue = '切换课程'
                            style={{textIndent:'10px',fontSize:'17px'}}
                        >
                            <option
                                value = '切换课程' 
                                key = 'only' 
                                style = {{display:'none'}}
                            >
                                切换课程
                            </option>
                            {
                                this.state.option.map(val=>{
                                    // console.log(val.course_id);
                                    return(
                                        <option
                                            value = {val.course_name}
                                            id = {val.course_id}
                                            style={{textAlign:"center",width:'100%'}}
                                            key = {val.course_id}
                                            selected = {(this.state.id == val.course_id)?true:false}
                                        >
                                            {val.course_name}
                                        </option>
                                    )
                                }) 
                            }
                        </select>
                    </div>
                </div>
                <div id = 'exit' onClick = {this.exit}>
                    退出
                </div>
            </div>
        )
    }
    exit = ()=>{
        let yesORno = window.confirm('确认要退出登录吗?');
        if(yesORno){
            localStorage.setItem('userId','');
            window.location.hash = '/';
        }
    }
    goTo = (url)=>{
        window.location.hash = url;
    }
    changeCourse = (e,url)=>{
        // console.log(e.target.children[e.target.selectedIndex].id);
        let id = e.target.children[e.target.selectedIndex].id;
        let course_name = e.target.value;
        let yes = window.confirm(`确定要切换为《${course_name}》吗?`);
        if(yes){
            Axios({
                url:url,
                method:"post",
                headers:{
                    Authorization:localStorage.getItem('userId')
                },
                data:{courseId:id}
            }).then(res=>{
                // console.log(res);
                //改变课程id
                alert(res.data.msg);
                let obj = JSON.parse(localStorage.getItem('userInfo'));
                obj.course_id = id;
                obj.course_name = course_name;
                localStorage.setItem('userInfo',JSON.stringify(obj));
                window.location.hash = '/';
            })
            return true;
        }else{
            return false;
        }
    }
}
