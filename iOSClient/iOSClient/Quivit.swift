//
//  Quivit.swift
//  iOSClient
//
//  Created by Bart Callant on 16/1/16.
//  Copyright © 2016 Bart Callant. All rights reserved.
//

import UIKit
import Alamofire
import SwiftyJSON

typealias QuivitResponse = (JSON?, NSError?) -> Void

class Quivit
{
	static func showAlert(view:UIViewController, title:String, message:String)
	{
		let alertController = UIAlertController(title: title, message: message, preferredStyle: .Alert)
		
		let okAction = UIAlertAction(title: "Ok", style: .Default) { (action) in }
		alertController.addAction(okAction)
		
		view.presentViewController(alertController, animated: true) { }
	}
	
	static func makeRequest(url:String, completionHandler:QuivitResponse)
	{
		UIApplication.sharedApplication().networkActivityIndicatorVisible = true
		
		Alamofire.request(.GET, url).responseJSON { response in
			UIApplication.sharedApplication().networkActivityIndicatorVisible = false
			
			switch response.result
			{
			case .Success(let data as NSData):
				print("[Quivit - makeRequest] .GET Request matches success")
				let jsonData = JSON(data: data)
				completionHandler(jsonData, nil)
			case .Failure(let error):
				print("[Quivit - makeRequest] .GET Request matches error")
				completionHandler(nil, error)
			default:
				print("[Quivit - makeRequest] Error with response")
				completionHandler(nil, nil)
			}
		}
	}
	
	static func getMatches(host:String, port:String, completionHandler: QuivitResponse)
	{
		print("[Quivit - getMatches] IP: \(host) PORT: \(port)")
		
		let date = NSDate()
		let calendar = NSCalendar.currentCalendar()
		let day = String(format: "%02d", calendar.component(.Day, fromDate: date))
		let month = String(format: "%02d", calendar.component(.Month, fromDate: date))
		let year = calendar.component(.Year, fromDate: date)
		
		print("[Quivit - getMatches] Day: \(day) Month: \(month) Year: \(year)")
		
		let url = "http://\(host):\(port)/api/game/\(year)/\(month)/\(day)/included"
		
		Quivit.makeRequest(url, completionHandler: completionHandler)
	}
	
	static func getPlayers(host:String, port:String, teamId:String, completionHandler: QuivitResponse)
	{
		UIApplication.sharedApplication().networkActivityIndicatorVisible = true

		print("[Quivit - getPlayers] IP: \(host) PORT: \(port)")
		print("[Quivit - getPlayers] TeamID: \(teamId)")
		
		let url = "http://\(host):\(port)/api/player/team/\(teamId)"
		
		Quivit.makeRequest(url, completionHandler: completionHandler)
	}
}