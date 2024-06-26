import './home.css'
import '../../App.css'
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import Main from '../MainPage/Main';
import { handleScroll } from '../../js/scroll';

export default function Home() {
    const [startX, setStartX] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.body.classList.add('no-scroll');

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    const handleClick = () => {
        handleScroll();
    };

    const handleTouchStart = (event) => {
        const touch = event.touches[0];
        setStartX(touch.clientX);
    };

    const handleTouchEnd = (event) => {
        const touch = event.changedTouches[0];
        const currentX = touch.clientX;

        const distance = currentX - startX;

        if (distance < 50) {
            handleScroll();
        }
    };

    return (
        <>
            <section id='landing' className='flex flex-col justify-between align-center'>
                <img src="/images/CYC_logo.png" alt="CYC Logo" id='cyc-logo' className='mt-45' />
                <div style={{
                    textAlign: "center",
                    fontSize: "20px",

                }}>
                    <div style={{
                        marginBottom: 10,
                        fontSize: "25px",
                        fontFamily: "FZChaoCuHei",
                    }}>开启你的
                    </div>
                    <div style={{
                        fontSize: "40px",
                        marginBottom: 10,
                        fontFamily: "FZChaoCuHei",
                    }}>服事旅程
                    </div>
                    <div style={{
                        fontSize: "12px",
                        fontFamily: "Stratos",
                    }}>STARTING YOUR SERVING JOURNEY
                    </div>
                </div>
                <div style={{
                        padding: "0px 40px 0px 40px",
                    }}>
                    <img src="/images/KV_title1.jpg"
                         alt="Landing Title"
                         className={"boy"}
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "15px",
                            maxWidth: "500px",
                        }}
                    />
                </div>
                <button style={{
                    marginBottom: "75px",
                    padding: "20px 80px 20px 80px",
                    borderRadius:"30px" ,
                    color:"#193A66",
                    fontFamily:"Stratos",
                    fontSize:"18px",
                    fontWeight:"bold",
                }} onClick={handleClick}>GET STARTED</button>
            </section>
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper home-swiper"
            >
                <SwiperSlide>
                    <section id='landing-info-1' className='flex flex-col align-center justify-between'>
                        <div className="overlay"></div>
                        <img src="/images/CYC_logo.png" alt="CYC Logo" id='cyc-logo' className='mt-45 relative' />
                        <div className='text-center padding-y-45 mb-75 relative'>
                            <div style={{ color: "white",
                                marginBottom: "30px",
                                fontSize: "24px",
                                fontFamily:"FZChaoCuHei" }}>
                                <div style={{marginBottom:6}}>像一家人一样</div>
                                <div>不遗余力地彼此服事</div>
                            </div>
                            <h6 style={{ marginBottom: "30px" }}>
                                教会是神赐给我们的属灵大家庭，
                                在这个大家庭里的每个人都有责任付出和给予，
                                就像一家人那样不遗余力地彼此服事。
                            </h6>
                        </div>
                    </section>
                </SwiperSlide>
                <SwiperSlide>
                    <section id='landing-info-2' className='flex flex-col align-center justify-between'>
                        <div className="overlay"></div>
                        <img src="/images/CYC_logo.png" alt="CYC Logo" id='cyc-logo' className='mt-45 relative' />
                        <div className='text-center padding-y-45 mb-75 relative'>
                            <div style={{ color: "white",
                                marginBottom: "30px",
                                fontSize: "24px",
                                fontFamily:"FZChaoCuHei"
                            }}>加入事工基本条件</div>
                            <div className='flex align-center mt-15'>
                                <img src="/icons/tick.svg" alt="Tick" className='tick-icon' />
                                <h6 className='FZChaoCuHei font-weight-400'>委身参加小组及聚会至少3个月</h6>
                            </div>
                            <div className='flex align-center mt-15'>
                                <img src="/icons/tick.svg" alt="Tick" className='tick-icon' />
                                <h6 className='FZChaoCuHei font-weight-400'>完成装备课程 MSJ 1、2、3</h6>
                            </div>
                            <div className='flex align-center mt-15'>
                                <img src="/icons/tick.svg" alt="Tick" className='tick-icon' />
                                <h6 className='FZChaoCuHei font-weight-400'>有牧养领袖的支持和推荐</h6>
                            </div>
                            <div className='flex align-center mt-15' style={{ marginBottom: "30px" }}>
                                <img src="/icons/tick.svg" alt="Tick" className='tick-icon' />
                                <h6 className='FZChaoCuHei font-weight-400'>愿意被塑造以及与团队配搭</h6>
                            </div>
                        </div>
                    </section>
                </SwiperSlide>
                <SwiperSlide onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                    <section id='landing-info-3' className='flex flex-col align-center justify-between'>
                        <div className="overlay"></div>
                        <img src="/images/CYC_logo.png" alt="CYC Logo" id='cyc-logo' className='mt-45 relative' />
                        <div className='text-center padding-y-45 mb-75 relative'>
                            <div style={{ color: "white",
                                marginBottom: "30px",
                                fontSize: "24px",
                                fontFamily:"FZChaoCuHei"
                            }}>
                                <div style={{marginBottom:6}}>共同建造这个</div>
                                <div style={{fontSize:30}}>属灵大家庭</div>
                            </div>
                            <h6>
                                今天就找出最能发挥你自己的强处，
                                或是你最有兴趣的事工，
                                使用神给你的一切来服事祂和其他人的需要。
                            </h6><br />
                            <h6 style={{ marginBottom: "30px" }}>我们不是要寻找完美的家，
                                而是我们共同建造这个爱的属灵大家庭！
                            </h6>
                        </div>
                    </section>
                </SwiperSlide>
            </Swiper>
            <Main />
        </>
    )
}