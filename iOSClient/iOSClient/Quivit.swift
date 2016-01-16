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
	var host:String = "quivit.herokuapp.com"
	var port:String = "80"
	var match:JSON?
	var selectedTeam:JSON?
	var selectedPlayer:JSON?
	let estimoteAppID:String = "quivit-cw1"
	let estimoteAppToken:String = "f157d0a442bf7fe7815ffd53076492cc"
	
	static func makeRequest(url:String, completionHandler:QuivitResponse)
	{
		UIApplication.sharedApplication().networkActivityIndicatorVisible = true
		
		Alamofire.request(.GET, url).responseJSON { response in
			UIApplication.sharedApplication().networkActivityIndicatorVisible = false
			
			switch response.result
			{
			case .Success(let data):
				print("[Quivit - makeRequest] .GET Request success")
				let jsonData = JSON(arrayLiteral: data)[0]
				completionHandler(jsonData, nil)
			case .Failure(let error):
				print("[Quivit - makeRequest] .GET Request error")
				completionHandler(nil, error)
			}
		}
	}
	
	func getMatches(completionHandler: QuivitResponse)
	{
		print("[Quivit - getMatches] IP: \(self.host) PORT: \(self.port)")
		
		let date = NSDate()
		let calendar = NSCalendar.currentCalendar()
		let day = String(format: "%02d", calendar.component(.Day, fromDate: date))
		let month = String(format: "%02d", calendar.component(.Month, fromDate: date))
		let year = calendar.component(.Year, fromDate: date)
		
		print("[Quivit - getMatches] Day: \(day) Month: \(month) Year: \(year)")
		
		let url = "http://\(self.host):\(self.port)/api/game/\(year)/\(month)/\(day)/included"
		
		Quivit.makeRequest(url, completionHandler: completionHandler)
	}
	
	func getPlayers(teamId teamId:String, completionHandler: QuivitResponse)
	{
		UIApplication.sharedApplication().networkActivityIndicatorVisible = true

		print("[Quivit - getPlayers] IP: \(host) PORT: \(port)")
		print("[Quivit - getPlayers] TeamID: \(teamId)")
		
		let url = "http://\(host):\(port)/api/player/team/\(teamId)"
		
		Quivit.makeRequest(url, completionHandler: completionHandler)
	}
	
	static func showAlert(view:UIViewController, title:String, message:String)
	{
		let alertController = UIAlertController(title: title, message: message, preferredStyle: .Alert)
		
		let okAction = UIAlertAction(title: "Ok", style: .Default) { (action) in }
		alertController.addAction(okAction)
		
		view.presentViewController(alertController, animated: true) { }
	}
}
