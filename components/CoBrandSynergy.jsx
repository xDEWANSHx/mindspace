"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

/* ═══════════════════════════════════════════════
   CONTENT: 4 Spreads, each with Left + Right page
═══════════════════════════════════════════════ */

// ── Page components defined inline below as JSX ──

function PageCoverLeft() {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(160deg,#1C0D05 0%,#2A1608 60%,#1A0D04 100%)",
      display: "flex", flexDirection: "column",
      justifyContent: "space-between", padding: "clamp(20px,4%,40px)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Wood grain lines */}
      {[15,30,50,70,85].map(p => (
        <div key={p} style={{
          position:"absolute", top:0, bottom:0, left:`${p}%`,
          width:1, background:"rgba(255,255,255,0.025)",
          pointerEvents:"none",
        }}/>
      ))}
      {/* Top */}
      <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
          <div style={{ width:20,height:1,background:"#D4B28C" }} />
          <span style={{ fontSize:8,fontWeight:800,letterSpacing:"0.4em",textTransform:"uppercase",color:"#D4B28C88" }}>
            MindSpace Library
          </span>
        </div>
        <div style={{ position:"relative",width:48,height:48,borderRadius:8,overflow:"hidden",border:"1px solid rgba(212,178,140,0.2)" }}>
          <Image src="/assets/logo.jpg" alt="MindSpace" fill sizes="48px" style={{objectFit:"contain",padding:4}} />
        </div>
      </div>
      {/* Center title */}
      <div>
        <h2 className="shrimp-display" style={{
          fontSize:"clamp(2rem,5vw,3.5rem)", lineHeight:0.88,
          color:"#FDF8F0", marginBottom:12,
        }}>
          THE<br/>MIND<br/>SPACE<br/>STORY
        </h2>
        <div style={{width:32,height:2,background:"#00A8CC",borderRadius:1,marginBottom:12}} />
        <p style={{fontSize:"clamp(0.6rem,1.2vw,0.72rem)",color:"rgba(212,178,140,0.55)",lineHeight:1.7,maxWidth:180}}>
          A curated collection of everything that makes MindSpace the finest study destination in Ambikapur.
        </p>
      </div>
      {/* Bottom serial */}
      <div style={{display:"flex",alignItems:"center",gap:8,opacity:0.3}}>
        <span style={{fontSize:8,fontFamily:"monospace",color:"#D4B28C"}}>VOL. I · 2025</span>
        <div style={{flex:1,height:"1px",background:"#D4B28C"}} />
        <span style={{fontSize:8,fontFamily:"monospace",color:"#D4B28C"}}>1</span>
      </div>
    </div>
  );
}

function PageCoverRight() {
  const chapters = [
    { num:"01", title:"On Table Delivery", tag:"Collab" },
    { num:"02", title:"10% Off for Members", tag:"Collab" },
    { num:"03", title:"Best Lounge in Ambikapur", tag:"Coming Soon" },
    { num:"04", title:"Well Ventilated Rooms", tag:"Feature" },
    { num:"05", title:"Dark & Light Rooms", tag:"Feature" },
    { num:"06", title:"Inverter Backup", tag:"Feature" },
    { num:"07", title:"High-Speed WiFi", tag:"Feature" },
    { num:"08", title:"Minimal Costing", tag:"Feature" },
  ];
  return (
    <div style={{
      width:"100%", height:"100%",
      background:"linear-gradient(135deg,#FDF8F0 0%,#F5ECD8 100%)",
      display:"flex", flexDirection:"column",
      justifyContent:"space-between", padding:"clamp(20px,4%,40px)",
      position:"relative", overflow:"hidden",
    }}>
      {/* Lined paper */}
      <div style={{position:"absolute",inset:0,pointerEvents:"none",opacity:0.04,
        backgroundImage:"repeating-linear-gradient(180deg,transparent,transparent 23px,#8B6347 23px,#8B6347 24px)",
        backgroundSize:"100% 24px"}} />
      <div style={{display:"flex",flexDirection:"column",gap:4,position:"relative",zIndex:1}}>
        <p style={{fontSize:8,fontWeight:800,letterSpacing:"0.4em",textTransform:"uppercase",color:"#C4935A",marginBottom:8}}>
          Contents
        </p>
        {chapters.map((c,i) => (
          <div key={c.num} style={{display:"flex",alignItems:"center",gap:8,paddingBottom:6,
            borderBottom:`1px solid rgba(139,99,71,${i===chapters.length-1?0:0.1})`}}>
            <span style={{fontSize:8,fontWeight:700,color:"#C4935A",minWidth:20,fontFamily:"monospace"}}>{c.num}</span>
            <span style={{fontSize:"clamp(0.6rem,1.1vw,0.7rem)",color:"#5C3D22",fontWeight:600,flex:1}}>{c.title}</span>
            <span style={{
              fontSize:7,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.15em",
              padding:"2px 6px",borderRadius:99,
              background: c.tag==="Collab"?"rgba(212,178,140,0.2)": c.tag==="Coming Soon"?"rgba(124,58,237,0.1)":"rgba(0,168,204,0.1)",
              color: c.tag==="Collab"?"#C4935A": c.tag==="Coming Soon"?"#7C3AED":"#00A8CC",
            }}>{c.tag}</span>
          </div>
        ))}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8,opacity:0.3,position:"relative",zIndex:1}}>
        <div style={{flex:1,height:"1px",background:"rgba(139,99,71,0.4)"}} />
        <span style={{fontSize:8,fontFamily:"monospace",color:"#7A5C3A"}}>2</span>
      </div>
    </div>
  );
}

function PageCollabLeft() {
  return (
    <div style={{
      width:"100%", height:"100%",
      background:"linear-gradient(135deg,#FDF8F0 0%,#F0E8D5 100%)",
      padding:"clamp(16px,3.5%,32px)",
      display:"flex", flexDirection:"column", gap:10,
      position:"relative", overflow:"hidden",
    }}>
      <div style={{position:"absolute",inset:0,pointerEvents:"none",opacity:0.04,
        backgroundImage:"repeating-linear-gradient(180deg,transparent,transparent 23px,#8B6347 23px,#8B6347 24px)",
        backgroundSize:"100% 24px"}} />
      <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",gap:8,flex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
          <div style={{width:3,height:20,background:"#D4B28C",borderRadius:2}} />
          <div>
            <p style={{fontSize:7,fontWeight:800,letterSpacing:"0.35em",textTransform:"uppercase",color:"#D4B28C"}}>
              Noiric Cafe × MindSpace
            </p>
            <p style={{fontSize:"clamp(0.7rem,1.5vw,0.9rem)",fontWeight:800,color:"#1C0F07",textTransform:"uppercase",letterSpacing:"0.05em"}}>
              Collaborative Perks
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"1fr 1fr",
          gridTemplateRows:"1fr 1fr",
          gap:8, flex:1,
        }}>
          {/* Card 1: On Table Delivery — spans full height left */}
          <div style={{
            gridRow:"1 / 3",
            background:"linear-gradient(160deg,#1C0F07 0%,#2A1A0A 100%)",
            borderRadius:12, padding:"clamp(12px,2.5%,20px)",
            display:"flex",flexDirection:"column",justifyContent:"space-between",
            border:"1px solid rgba(212,178,140,0.15)",
            position:"relative",overflow:"hidden",
          }}>
            <div style={{position:"absolute",top:0,right:0,width:60,height:60,borderRadius:"0 12px 0 60px",
              background:"rgba(212,178,140,0.06)"}} />
            <div>
              <div style={{
                display:"inline-flex",alignItems:"center",gap:4,
                background:"rgba(212,178,140,0.12)",border:"1px solid rgba(212,178,140,0.2)",
                borderRadius:99,padding:"3px 8px",marginBottom:8,
              }}>
                <span style={{fontSize:6,fontWeight:800,letterSpacing:"0.3em",textTransform:"uppercase",color:"#D4B28C"}}>
                  LIVE
                </span>
              </div>
              <h3 className="shrimp-display" style={{
                fontSize:"clamp(1rem,2.5vw,1.4rem)",color:"#FDF8F0",lineHeight:1,marginBottom:6,
              }}>ON TABLE DELIVERY</h3>
              <p style={{fontSize:"clamp(0.55rem,1vw,0.68rem)",color:"rgba(212,178,140,0.6)",lineHeight:1.6}}>
                Scan the QR at your desk. Your order from Noiric Cafe arrives at your table — hot and on time.
              </p>
            </div>
            <div style={{
              display:"flex",alignItems:"center",justifyContent:"center",
              width:36,height:36,borderRadius:99,
              background:"rgba(212,178,140,0.1)",border:"1px solid rgba(212,178,140,0.2)",
            }}>
              <span style={{fontSize:16}}>🚀</span>
            </div>
          </div>

          {/* Card 2: 10% Off */}
          <div style={{
            background:"linear-gradient(135deg,rgba(212,178,140,0.12) 0%,rgba(196,154,112,0.08) 100%)",
            borderRadius:12,padding:"clamp(10px,2%,16px)",
            border:"1px solid rgba(212,178,140,0.2)",
            display:"flex",flexDirection:"column",justifyContent:"space-between",
          }}>
            <div>
              <span style={{
                fontFamily:"'Anton','Impact',sans-serif",
                fontSize:"clamp(1.8rem,4vw,2.5rem)",
                color:"#C4935A",lineHeight:1,display:"block",
              }}>10%</span>
              <span style={{fontSize:7,fontWeight:800,letterSpacing:"0.3em",textTransform:"uppercase",color:"#9A7558"}}>
                OFF
              </span>
            </div>
            <p style={{fontSize:"clamp(0.5rem,0.9vw,0.62rem)",color:"#7A5C3A",lineHeight:1.5}}>
              Exclusive discount for active members
            </p>
          </div>

          {/* Card 3: QR Visual */}
          <div style={{
            background:"linear-gradient(135deg,#00A8CC15 0%,#14B8A610 100%)",
            borderRadius:12,padding:"clamp(10px,2%,16px)",
            border:"1px solid rgba(0,168,204,0.15)",
            display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",
            gap:4,
          }}>
            <span style={{fontSize:22}}>📱</span>
            <span style={{fontSize:"clamp(0.5rem,0.9vw,0.62rem)",fontWeight:700,textTransform:"uppercase",
              letterSpacing:"0.2em",color:"#00A8CC",textAlign:"center"}}>Scan &amp; Order</span>
          </div>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8,opacity:0.3,position:"relative",zIndex:1}}>
        <span style={{fontSize:8,fontFamily:"monospace",color:"#7A5C3A"}}>3</span>
        <div style={{flex:1,height:"1px",background:"rgba(139,99,71,0.4)"}} />
      </div>
    </div>
  );
}

function PageCollabRight() {
  return (
    <div style={{
      width:"100%",height:"100%",
      position:"relative",overflow:"hidden",
    }}>
      <Image src="/assets/feature_table_delivery.png" alt="Noiric Delivery" fill sizes="50vw" style={{objectFit:"cover"}} />
      <div style={{
        position:"absolute",inset:0,
        background:"linear-gradient(160deg,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.2) 60%,rgba(212,178,140,0.15) 100%)",
      }} />
      <div style={{
        position:"absolute",bottom:0,left:0,right:0,
        padding:"clamp(16px,3%,28px)",
      }}>
        <div style={{
          display:"inline-flex",alignItems:"center",gap:6,
          padding:"6px 12px",borderRadius:99,
          background:"rgba(212,178,140,0.15)",
          border:"1px solid rgba(212,178,140,0.25)",
          backdropFilter:"blur(8px)",
          marginBottom:8,
        }}>
          <span style={{fontSize:7,fontWeight:800,letterSpacing:"0.35em",textTransform:"uppercase",color:"#D4B28C"}}>
            Certified Partnership
          </span>
        </div>
        <p className="shrimp-display" style={{
          fontSize:"clamp(1rem,2.5vw,1.5rem)",color:"#fff",lineHeight:1.1,
        }}>
          NOIRIC CAFE<br/>× MINDSPACE
        </p>
      </div>
      <div style={{position:"absolute",top:16,right:16,opacity:0.4}}>
        <span style={{fontSize:8,fontFamily:"monospace",color:"#fff"}}>4</span>
      </div>
    </div>
  );
}

function PageLibraryLeft() {
  return (
    <div style={{width:"100%",height:"100%",position:"relative",overflow:"hidden"}}>
      <Image src="/assets/feature_lounge.png" alt="Library" fill sizes="50vw" style={{objectFit:"cover"}} />
      <div style={{
        position:"absolute",inset:0,
        background:"linear-gradient(90deg,rgba(0,0,0,0.1) 0%,rgba(0,0,0,0) 40%,rgba(0,0,0,0.5) 100%)",
      }} />
      <div style={{position:"absolute",top:20,left:20}}>
        <div style={{
          padding:"4px 10px",borderRadius:99,
          background:"rgba(0,168,204,0.15)",border:"1px solid rgba(0,168,204,0.25)",
          backdropFilter:"blur(8px)",
        }}>
          <span style={{fontSize:7,fontWeight:800,letterSpacing:"0.35em",textTransform:"uppercase",color:"#00A8CC"}}>
            MindSpace Library
          </span>
        </div>
      </div>
      <div style={{position:"absolute",bottom:16,left:16,opacity:0.4}}>
        <span style={{fontSize:8,fontFamily:"monospace",color:"#fff"}}>5</span>
      </div>
    </div>
  );
}

function PageLibraryRight() {
  const features = [
    { emoji:"🏛️",title:"Best Lounge",sub:"Best in Ambikapur",tag:"Coming Soon",tagColor:"#7C3AED",tagBg:"rgba(124,58,237,0.12)",wide:true,
      desc:"Ambikapur's finest relaxation lounge — premium seating, curated ambiance, books at arm's reach." },
    { emoji:"💨",title:"Ventilated Rooms",sub:"Fresh air always",tag:"Available",tagColor:"#14B8A6",tagBg:"rgba(20,184,166,0.1)",wide:false,
      desc:"Cross-ventilated, thermally comfortable rooms." },
    { emoji:"🌗",title:"Dark & Light",sub:"Pick your mood",tag:"Available",tagColor:"#00A8CC",tagBg:"rgba(0,168,204,0.1)",wide:false,
      desc:"Two distinct atmospheres — bright daylight or moody dark room." },
  ];
  return (
    <div style={{
      width:"100%",height:"100%",
      background:"linear-gradient(135deg,#FDF8F0 0%,#F0E8D5 100%)",
      padding:"clamp(16px,3.5%,32px)",
      display:"flex",flexDirection:"column",gap:8,
      position:"relative",overflow:"hidden",
    }}>
      <div style={{position:"absolute",inset:0,pointerEvents:"none",opacity:0.04,
        backgroundImage:"repeating-linear-gradient(180deg,transparent,transparent 23px,#8B6347 23px,#8B6347 24px)",
        backgroundSize:"100% 24px"}} />
      <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",gap:8,flex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:3,height:20,background:"#00A8CC",borderRadius:2}} />
          <div>
            <p style={{fontSize:7,fontWeight:800,letterSpacing:"0.35em",textTransform:"uppercase",color:"#00A8CC"}}>MindSpace Features</p>
            <p style={{fontSize:"clamp(0.7rem,1.5vw,0.9rem)",fontWeight:800,color:"#1C0F07",textTransform:"uppercase",letterSpacing:"0.05em"}}>The Space Itself</p>
          </div>
        </div>
        {/* Bento */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"1fr 1fr",gap:8,flex:1}}>
          {/* Lounge - wide */}
          <div style={{
            gridColumn:"1 / 3",
            background:"linear-gradient(135deg,rgba(124,58,237,0.08),rgba(124,58,237,0.04))",
            borderRadius:12,padding:"clamp(12px,2.5%,18px)",
            border:"1px solid rgba(124,58,237,0.15)",
            display:"flex",flexDirection:"column",justifyContent:"space-between",
            position:"relative",overflow:"hidden",
          }}>
            <div style={{position:"absolute",top:0,right:0,padding:"6px 10px",
              background:"rgba(124,58,237,0.12)",borderRadius:"0 12px 0 12px"}}>
              <span style={{fontSize:7,fontWeight:800,letterSpacing:"0.2em",textTransform:"uppercase",color:"#7C3AED"}}>Coming Soon</span>
            </div>
            <div>
              <span style={{fontSize:20}}>🏛️</span>
              <h3 className="shrimp-display" style={{fontSize:"clamp(0.85rem,2vw,1.1rem)",color:"#1C0F07",lineHeight:1,marginTop:4}}>
                AMBIKAPUR'S BEST LOUNGE
              </h3>
            </div>
            <p style={{fontSize:"clamp(0.52rem,0.9vw,0.62rem)",color:"#7A5C3A",lineHeight:1.5}}>
              Premium seating, curated ambiance, books within reach — a space built to make you want to stay.
            </p>
          </div>
          {/* Ventilation */}
          <div style={{
            background:"rgba(20,184,166,0.06)",borderRadius:12,
            padding:"clamp(10px,2%,16px)",border:"1px solid rgba(20,184,166,0.15)",
            display:"flex",flexDirection:"column",justifyContent:"space-between",
          }}>
            <span style={{fontSize:18}}>💨</span>
            <div>
              <h3 className="shrimp-display" style={{fontSize:"clamp(0.75rem,1.8vw,1rem)",color:"#1C0F07",lineHeight:1}}>VENTILATED</h3>
              <p style={{fontSize:"clamp(0.5rem,0.85vw,0.6rem)",color:"#7A5C3A",marginTop:3,lineHeight:1.4}}>Fresh air, clear mind.</p>
            </div>
          </div>
          {/* Dark & Light */}
          <div style={{
            background:"rgba(0,168,204,0.06)",borderRadius:12,
            padding:"clamp(10px,2%,16px)",border:"1px solid rgba(0,168,204,0.15)",
            display:"flex",flexDirection:"column",justifyContent:"space-between",
          }}>
            <span style={{fontSize:18}}>🌗</span>
            <div>
              <h3 className="shrimp-display" style={{fontSize:"clamp(0.75rem,1.8vw,1rem)",color:"#1C0F07",lineHeight:1}}>DARK &amp; LIGHT</h3>
              <p style={{fontSize:"clamp(0.5rem,0.85vw,0.6rem)",color:"#7A5C3A",marginTop:3,lineHeight:1.4}}>Two moods. Your choice.</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8,opacity:0.3,position:"relative",zIndex:1}}>
        <div style={{flex:1,height:"1px",background:"rgba(139,99,71,0.4)"}} />
        <span style={{fontSize:8,fontFamily:"monospace",color:"#7A5C3A"}}>6</span>
      </div>
    </div>
  );
}

function PageTechLeft() {
  return (
    <div style={{
      width:"100%",height:"100%",
      background:"linear-gradient(135deg,#FDF8F0 0%,#F0E8D5 100%)",
      padding:"clamp(16px,3.5%,32px)",
      display:"flex",flexDirection:"column",gap:8,
      position:"relative",overflow:"hidden",
    }}>
      <div style={{position:"absolute",inset:0,pointerEvents:"none",opacity:0.04,
        backgroundImage:"repeating-linear-gradient(180deg,transparent,transparent 23px,#8B6347 23px,#8B6347 24px)",
        backgroundSize:"100% 24px"}} />
      <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",gap:8,flex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:3,height:20,background:"#D4B28C",borderRadius:2}} />
          <div>
            <p style={{fontSize:7,fontWeight:800,letterSpacing:"0.35em",textTransform:"uppercase",color:"#D4B28C"}}>MindSpace Features</p>
            <p style={{fontSize:"clamp(0.7rem,1.5vw,0.9rem)",fontWeight:800,color:"#1C0F07",textTransform:"uppercase",letterSpacing:"0.05em"}}>Tech &amp; Value</p>
          </div>
        </div>
        {/* Bento */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"1fr 1fr",gap:8,flex:1}}>
          {/* Inverter - wide */}
          <div style={{
            gridColumn:"1 / 3",
            background:"linear-gradient(135deg,rgba(212,178,140,0.12),rgba(196,154,112,0.06))",
            borderRadius:12,padding:"clamp(12px,2.5%,18px)",
            border:"1px solid rgba(212,178,140,0.2)",
            display:"flex",flexDirection:"column",justifyContent:"space-between",
            position:"relative",overflow:"hidden",
          }}>
            <div style={{
              position:"absolute",top:0,right:0,padding:"6px 10px",
              background:"rgba(212,178,140,0.12)",borderRadius:"0 12px 0 12px",
            }}>
              <span style={{fontSize:7,fontWeight:800,letterSpacing:"0.2em",textTransform:"uppercase",color:"#D4B28C"}}>24/7 Active</span>
            </div>
            <span style={{fontSize:20}}>⚡</span>
            <div>
              <h3 className="shrimp-display" style={{fontSize:"clamp(0.85rem,2vw,1.1rem)",color:"#1C0F07",lineHeight:1}}>INVERTER BACKUP</h3>
              <p style={{fontSize:"clamp(0.52rem,0.9vw,0.62rem)",color:"#7A5C3A",marginTop:4,lineHeight:1.5}}>
                Power cuts? Not your problem. Every desk stays powered through any grid failure.
              </p>
            </div>
          </div>
          {/* WiFi */}
          <div style={{
            background:"rgba(20,184,166,0.06)",borderRadius:12,
            padding:"clamp(10px,2%,16px)",border:"1px solid rgba(20,184,166,0.15)",
            display:"flex",flexDirection:"column",justifyContent:"space-between",
          }}>
            <span style={{fontSize:18}}>📶</span>
            <div>
              <h3 className="shrimp-display" style={{fontSize:"clamp(0.75rem,1.8vw,1rem)",color:"#1C0F07",lineHeight:1}}>HIGH-SPEED WIFI</h3>
              <p style={{fontSize:"clamp(0.5rem,0.85vw,0.6rem)",color:"#7A5C3A",marginTop:3,lineHeight:1.4}}>Zero lag. Full bandwidth.</p>
            </div>
          </div>
          {/* Pricing */}
          <div style={{
            background:"rgba(0,168,204,0.06)",borderRadius:12,
            padding:"clamp(10px,2%,16px)",border:"1px solid rgba(0,168,204,0.15)",
            display:"flex",flexDirection:"column",justifyContent:"space-between",
          }}>
            <span style={{fontSize:18}}>💰</span>
            <div>
              <h3 className="shrimp-display" style={{fontSize:"clamp(0.75rem,1.8vw,1rem)",color:"#1C0F07",lineHeight:1}}>MINIMAL COST</h3>
              <p style={{fontSize:"clamp(0.5rem,0.85vw,0.6rem)",color:"#7A5C3A",marginTop:3,lineHeight:1.4}}>Premium. Affordable. Always.</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8,opacity:0.3,position:"relative",zIndex:1}}>
        <span style={{fontSize:8,fontFamily:"monospace",color:"#7A5C3A"}}>7</span>
        <div style={{flex:1,height:"1px",background:"rgba(139,99,71,0.4)"}} />
      </div>
    </div>
  );
}

function PageTechRight({ onCTA }) {
  return (
    <div style={{
      width:"100%",height:"100%",
      background:"linear-gradient(160deg,#1C0D05 0%,#2A1608 60%,#1A0D04 100%)",
      display:"flex",flexDirection:"column",
      justifyContent:"space-between",
      padding:"clamp(20px,4%,40px)",
      position:"relative",overflow:"hidden",
    }}>
      {[15,30,50,70,85].map(p => (
        <div key={p} style={{position:"absolute",top:0,bottom:0,left:`${p}%`,width:1,
          background:"rgba(255,255,255,0.025)",pointerEvents:"none"}} />
      ))}
      <div style={{display:"flex",flexDirection:"column",gap:10,position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:20,height:1,background:"#00A8CC"}} />
          <span style={{fontSize:8,fontWeight:800,letterSpacing:"0.4em",textTransform:"uppercase",color:"#00A8CC88"}}>
            The End
          </span>
        </div>
        <h2 className="shrimp-display" style={{
          fontSize:"clamp(1.5rem,4vw,2.5rem)",color:"#FDF8F0",lineHeight:0.9,
        }}>
          QUIET<br/>SPACE.<br/>
          <span style={{color:"#00A8CC"}}>LOUD<br/>DREAMS.</span>
        </h2>
        <div style={{width:32,height:2,background:"#D4B28C",borderRadius:1}} />
        <p style={{fontSize:"clamp(0.58rem,1.1vw,0.7rem)",color:"rgba(212,178,140,0.55)",lineHeight:1.7,maxWidth:200}}>
          Everything you just read — it's all real, it's all ready, and it's all waiting for you in Ambikapur.
        </p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12,position:"relative",zIndex:1}}>
        <button
          onClick={onCTA}
          style={{
            padding:"12px 24px",
            background:"linear-gradient(135deg,#00A8CC,#14B8A6)",
            border:"none",borderRadius:6,cursor:"pointer",
            fontSize:"clamp(0.6rem,1.1vw,0.7rem)",fontWeight:800,
            letterSpacing:"0.3em",textTransform:"uppercase",color:"#fff",
            boxShadow:"0 8px 24px rgba(0,168,204,0.3)",
            transition:"transform 0.2s,box-shadow 0.2s",
          }}
          onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.04)";e.currentTarget.style.boxShadow="0 12px 30px rgba(0,168,204,0.4)"}}
          onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,168,204,0.3)"}}
        >
          Claim Your Seat →
        </button>
        <div style={{display:"flex",alignItems:"center",gap:8,opacity:0.25}}>
          <div style={{flex:1,height:"1px",background:"#D4B28C"}} />
          <span style={{fontSize:8,fontFamily:"monospace",color:"#D4B28C"}}>8</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   SPREADS CONFIG
═══════════════════════════════════════ */
const SPREAD_COUNT = 4;

/* ═══════════════════════════════════════
   MAIN BOOK COMPONENT
═══════════════════════════════════════ */
export default function CoBrandSynergy() {
  const [spread, setSpread] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [pending, setPending] = useState(null);
  const [dir, setDir] = useState("forward");
  const timerRef = useRef(null);

  const FLIP_MS = 750;

  const goTo = (next) => {
    if (flipping || next < 0 || next >= SPREAD_COUNT) return;
    clearTimeout(timerRef.current);
    setDir(next > spread ? "forward" : "backward");
    setPending(next);
    setFlipping(true);
    timerRef.current = setTimeout(() => {
      setSpread(next);
      setFlipping(false);
      setPending(null);
    }, FLIP_MS);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleCTA = () => {
    const el = document.getElementById("lead-capture-crm-payload");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  /* Render left / right page content by spread index */
  const renderLeft = (idx) => {
    if (idx === 0) return <PageCoverLeft />;
    if (idx === 1) return <PageCollabLeft />;
    if (idx === 2) return <PageLibraryLeft />;
    if (idx === 3) return <PageTechLeft />;
    return null;
  };
  const renderRight = (idx) => {
    if (idx === 0) return <PageCoverRight />;
    if (idx === 1) return <PageCollabRight />;
    if (idx === 2) return <PageLibraryRight />;
    if (idx === 3) return <PageTechRight onCTA={handleCTA} />;
    return null;
  };

  const nextIdx = pending ?? spread;

  /* During a FORWARD flip:
     - Left page stays (current spread's left)
     - Behind the flipping right: next spread's right is already there
     - Flipping right page: front=current right, back=next left

     During a BACKWARD flip:
     - Right side shows current spread's right (already visible)
     - Flipping LEFT page: front=current left, back=prev right
     This is more complex — for simplicity we do forward-only flip visually
     and just swap content for backward with a quick fade
  */

  const isForward = dir === "forward";

  return (
    <section
      id="co-brand-pantry-matrix"
      style={{
        position: "relative",
        padding: "clamp(40px,8vh,80px) 0",
        background: [
          "linear-gradient(180deg,",
          "#8B5E3C 0%,#7A5230 5%,#9B6E42 10%,#8B6040 15%,",
          "#96703F 20%,#845535 25%,#9E7245 30%,#8B6040 35%,",
          "#93683C 40%,#7D5028 45%,#9B6E42 50%,#875C38 55%,",
          "#96703F 60%,#825033 65%,#9A6D41 70%,#886038 75%,",
          "#94693D 80%,#7E5129 85%,#9C6F43 90%,#886038 95%,#8B5E3C 100%",
          ")",
        ].join(""),
        overflow: "hidden",
      }}
    >
      {/* Wood noise overlay */}
      <div style={{
        position:"absolute",inset:0,pointerEvents:"none",
        backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.02 0.5' numOctaves='5' seed='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0.3'/%3E%3C/filter%3E%3Crect width='600' height='600' filter='url(%23n)' opacity='0.22'/%3E%3C/svg%3E")`,
        backgroundSize:"400px",
        mixBlendMode:"multiply",
        opacity:0.5,
      }} />
      {/* Vignette */}
      <div style={{
        position:"absolute",inset:0,pointerEvents:"none",
        background:"radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)",
      }} />

      <div style={{
        position:"relative",zIndex:1,
        display:"flex",flexDirection:"column",alignItems:"center",
        gap:"clamp(16px,3vh,28px)",
        padding:"0 clamp(12px,3vw,40px)",
      }}>

        {/* ── Section label ── */}
        <div style={{textAlign:"center"}}>
          <p style={{
            fontSize:9,fontWeight:800,letterSpacing:"0.45em",
            textTransform:"uppercase",color:"rgba(255,255,255,0.45)",
            marginBottom:6,
          }}>
            MindSpace × Noiric Cafe
          </p>
          <h2 className="shrimp-display" style={{
            fontSize:"clamp(1.5rem,4vw,2.5rem)",
            color:"#FDF8F0",lineHeight:0.95,
            textShadow:"0 2px 20px rgba(0,0,0,0.4)",
          }}>
            THE FEATURE BOOK
          </h2>
        </div>

        {/* ════════════════════
            THE BOOK
        ════════════════════ */}
        <div style={{
          position:"relative",
          width:"min(900px,96vw)",
          perspective:"2400px",
        }}>

          {/* Page count strips (book thickness effect) */}
          <div style={{
            position:"absolute",right:-5,top:"10%",bottom:"10%",
            width:12,borderRadius:"0 2px 2px 0",
            background:"linear-gradient(90deg,#E8D9BF,#D4C4A0,#BFA888)",
            boxShadow:"2px 0 6px rgba(0,0,0,0.2)",
            zIndex:0,
          }}>
            {[...Array(8)].map((_,i) => (
              <div key={i} style={{
                position:"absolute",top:`${i*12+5}%`,
                left:0,right:0,height:1,
                background:"rgba(0,0,0,0.08)",
              }} />
            ))}
          </div>

          {/* Book shadow */}
          <div style={{
            position:"absolute",
            bottom:-20,left:"5%",right:"5%",
            height:40,
            background:"rgba(0,0,0,0.4)",
            filter:"blur(20px)",
            borderRadius:"50%",
            zIndex:0,
          }} />

          {/* ── Book body ── */}
          <div style={{
            position:"relative",
            display:"flex",
            height:"clamp(360px,55vh,520px)",
            borderRadius:"4px 8px 8px 4px",
            boxShadow:"0 30px 80px rgba(0,0,0,0.55), 0 4px 20px rgba(0,0,0,0.3)",
            overflow:"hidden",
            transformStyle:"preserve-3d",
            zIndex:1,
          }}>

            {/* LEFT PAGE (static — always shows current spread's left) */}
            <div style={{width:"50%",height:"100%",position:"relative",overflow:"hidden",
              boxShadow:"inset -4px 0 12px rgba(0,0,0,0.15)"}}>
              {renderLeft(spread)}
            </div>

            {/* CENTER SPINE */}
            <div style={{
              width:10,height:"100%",flexShrink:0,position:"relative",zIndex:20,
              background:"linear-gradient(90deg,rgba(0,0,0,0.5) 0%,#3D2210 30%,#5C3A1E 50%,#3D2210 70%,rgba(0,0,0,0.5) 100%)",
              boxShadow:"inset -2px 0 4px rgba(0,0,0,0.3),inset 2px 0 4px rgba(0,0,0,0.3)",
            }} />

            {/* RIGHT HALF wrapper: contains background content + flipping page */}
            <div style={{
              width:"calc(50% - 10px)",height:"100%",
              position:"relative",overflow:"hidden",
              transformStyle:"preserve-3d",
            }}>

              {/* Background: shows NEXT spread's right (revealed as page flips away) */}
              <div style={{
                position:"absolute",inset:0,
                opacity: flipping && isForward ? 1 : 0,
                transition: "opacity 0.1s",
              }}>
                {nextIdx !== spread && renderRight(nextIdx)}
              </div>

              {/* Current right page + the flip animation */}
              <div style={{
                position:"absolute",inset:0,
                transformOrigin:"left center",
                transformStyle:"preserve-3d",
                transform: flipping && isForward ? `rotateY(-180deg)` : "rotateY(0deg)",
                transition: flipping && isForward ? `transform ${FLIP_MS}ms cubic-bezier(0.645,0.045,0.355,1.000)` : "none",
                zIndex:10,
              }}>
                {/* FRONT: current right page */}
                <div style={{
                  position:"absolute",inset:0,
                  backfaceVisibility:"hidden",
                  WebkitBackfaceVisibility:"hidden",
                }}>
                  {renderRight(spread)}
                  {/* Page curl shadow during flip */}
                  {flipping && (
                    <div style={{
                      position:"absolute",right:0,top:0,bottom:0,width:"30%",
                      background:"linear-gradient(270deg,rgba(0,0,0,0.25),transparent)",
                      pointerEvents:"none",
                    }} />
                  )}
                </div>

                {/* BACK: next spread's left page (shown when page has flipped over) */}
                <div style={{
                  position:"absolute",inset:0,
                  backfaceVisibility:"hidden",
                  WebkitBackfaceVisibility:"hidden",
                  transform:"rotateY(180deg) scaleX(-1)",
                }}>
                  {nextIdx !== spread && renderLeft(nextIdx)}
                </div>
              </div>

              {/* NON-flipping case: just show current right normally */}
              {!flipping && (
                <div style={{position:"absolute",inset:0,zIndex:5}}>
                  {renderRight(spread)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Navigation ── */}
        <div style={{
          display:"flex",alignItems:"center",gap:"clamp(16px,3vw,32px)",
        }}>
          {/* Prev */}
          <button
            onClick={() => goTo(spread - 1)}
            disabled={spread === 0 || flipping}
            style={{
              display:"flex",alignItems:"center",gap:8,
              padding:"10px 20px",borderRadius:6,cursor:spread===0?"not-allowed":"pointer",
              background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",
              backdropFilter:"blur(8px)",
              opacity: spread === 0 ? 0.3 : 1,
              transition:"all 0.2s",color:"#FDF8F0",fontSize:9,fontWeight:800,
              letterSpacing:"0.3em",textTransform:"uppercase",
            }}
            onMouseEnter={e=>{if(spread>0)e.currentTarget.style.background="rgba(255,255,255,0.14)"}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.08)"}}
          >
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Prev
          </button>

          {/* Page indicators */}
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {Array.from({length:SPREAD_COUNT}).map((_,i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === spread ? 28 : 8,
                  height:8,borderRadius:99,border:"none",cursor:"pointer",
                  background: i === spread ? "#FDF8F0" : "rgba(255,255,255,0.25)",
                  transition:"all 0.35s ease",padding:0,
                }}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => goTo(spread + 1)}
            disabled={spread === SPREAD_COUNT - 1 || flipping}
            style={{
              display:"flex",alignItems:"center",gap:8,
              padding:"10px 20px",borderRadius:6,cursor:spread===SPREAD_COUNT-1?"not-allowed":"pointer",
              background: spread < SPREAD_COUNT-1 ? "rgba(0,168,204,0.15)" : "rgba(255,255,255,0.08)",
              border: spread < SPREAD_COUNT-1 ? "1px solid rgba(0,168,204,0.3)" : "1px solid rgba(255,255,255,0.12)",
              backdropFilter:"blur(8px)",
              opacity: spread === SPREAD_COUNT-1 ? 0.3 : 1,
              transition:"all 0.2s",
              color: spread < SPREAD_COUNT-1 ? "#00A8CC" : "#FDF8F0",
              fontSize:9,fontWeight:800,letterSpacing:"0.3em",textTransform:"uppercase",
            }}
            onMouseEnter={e=>{if(spread<SPREAD_COUNT-1)e.currentTarget.style.background="rgba(0,168,204,0.25)"}}
            onMouseLeave={e=>{e.currentTarget.style.background=spread<SPREAD_COUNT-1?"rgba(0,168,204,0.15)":"rgba(255,255,255,0.08)"}}
          >
            Next Page
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
