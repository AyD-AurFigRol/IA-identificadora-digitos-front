import React from 'react';

export default function Footer() {
    return (
        <footer className='bg-blue-600 text-white flex flex-col text-center'>
            <div className="border-b-2 text-center">
                <p><strong>Grupo:</strong> 5CM5</p>
                <p>Proyecto <strong>Skynet</strong></p>
            </div>
            <div className="flex flex-row justify-around">
                <div>
                    <p>Figueroa Bracamontes Luis Alfredo</p>
                    <p>2021630266</p>
                </div>
                <div>
                    <p>Muñoz gonzález Daniel Aurelio</p>
                    <p>2021630807</p>
                </div>
                <div>
                    <p>Rolón Cárdenas Roberto</p>
                    <p>2021630589</p>
                </div>
            </div>
        </footer>
    )
}