import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "@/styles/Login.module.scss";
import Boy from "@/public/assets/img1.png"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router";


export default function login() {
    const router = useRouter();
    const { data: session } = useSession();
    
    const [sentence, setSentence] = useState("");

    const email = useRef();
    const password = useRef();
    
    if (session) {
        router.push("/dashboard")
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await signIn("credentials", {
            email: email.current.value,
            password: password.current.value,
            redirect: false
        });
        console.log(res)
    }

 
    useEffect(() => {
        const sentences = [
            "Set your sights on ambitious goals and witness the incredible glow-up journey that awaits you.",
            "Welcome to our transformative platform, where you have the power to elevate every aspect of your life.",
            "We believe that success is not just about achieving milestones but embracing continuous growth.",
            "Our platform empowers you to compete with yourself and others, inspiring you to go beyond your limits and become the best version of yourself.",
            "You'll experience the joy of progress, no matter how big or small, as you embark on your personal development adventure.",
        ]
        setSentence(sentences[Math.floor(Math.random() * sentences.length)])
    },[])

    

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-400">
            <div className="container mx-auto flex xl:px-36 flex-col-reverse md:flex-row">
                <div className={`bg-gradient-to-r from-blue-500 to-indigo-500 md:w-1/2 flex items-end md:rounded-l-xl  ${styles.imgStyle}`}>
                    <Image style={{ height: "90%", objectFit: "cover", zIndex: 2 }} src={Boy} width={1000} alt="Bonhomme aventure" priority />
                    <div className={styles.cloud_one}></div>
                    <div className={styles.cloud_two}></div>
                </div>
                <div className="md:w-1/2 text-center flex items-center bg-white md:rounded-r-xl py-8 xl:py-16">
                    <form className="px-8 md:px-16" onSubmit={handleSubmit}>
                        <h1 className="text-3xl font-semibold">Ready to glow-up ?</h1>
                        <p className="mt-4">{sentence}</p>
                        <div className="form-control mt-5">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input ref={email} required type="text" placeholder="SambeauDupont@mediaschool.me" className="input input-bordered " />
                        </div>
                        <div className="form-control mt-5">
                            <label className="label">
                                <span className="label-text">Mot de passe</span>
                            </label>
                            <input ref={password} required type="password" placeholder="Mot de passe" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Mot de passe oublié?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Se connecter</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
