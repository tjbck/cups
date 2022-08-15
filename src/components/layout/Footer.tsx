import Link from 'next/link';
import React from 'react'
import Logo from '../Logo';


const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<>
			<hr />

			<footer className="flex justify-center px-4 md:px-10 text-gray-800 bg-white text-center">
				<div className="flex flex-col justify-between py-10 w-full h-64 min-h-max">
					<div>
						<div className="flex flex-col items-center justify-between md:flex-row mb-3">
							<div className="px-4">
								<Logo />
							</div>

							<div className="flex mt-4 md:m-0">
								<div className="px-4">
									<Link href="/terms">
										<a

											className="px-4 text-sm font-medium text-gray-800 hover:text-gray-700  hover:underline"
										>Terms
										</a>
									</Link>
									<Link href="/privacy">
										<a

											className="px-4 text-sm font-medium text-gray-800 hover:text-gray-700  hover:underline"
										>Privacy
										</a>
									</Link>
								</div>
							</div>
						</div>

						<div className="flex flex-col md:flex-row items-center justify-between md:text-left px-4">
							<div className="font-medium text-xs text-gray-400  hover:text-gray-700 mb-auto ">
								Stay in sync with your students while you teach.
							</div>
						</div>
					</div>

					<div className="flex flex-col md:flex-row items-center justify-end md:text-left px-4 pt-4">
						<div className="font-matter text-xs flex md:m-0 px-4 md:text-right">
							<div className="my-auto">
								<span className="font-medium">
									© {year} Fastcups All rights reserved.
								</span>
								<br />

								<div className='mt-2'>
									<div className=" font-medium text-xs text-gray-400">
										Inspired by <br className=' sm:hidden' />
										<Link href="https://github.com/radekosmulski">

											<a className="linear-wipe">Radek Osmulski</a>
										</Link> & <Link href="https://github.com/jph00">
											<a className="linear-wipe">Jeremy Howard</a>
										</Link>
									</div>


									<div className=" font-medium text-xs text-gray-400">
										Powered by <Link href="https://jryng.com">
											<a className="linear-wipe">Timothy J. Baek</a>
										</Link>
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	)
}

export default Footer