//
//  JSAPICaller.swift
//  Sentimentalist
//
//  Created by Arvin Sanmuga Rajah on 13/02/2019.
//  Copyright © 2019 The Smyth Group. All rights reserved.
//

import UIKit
import JavaScriptCore

class JSAPICaller: NSObject {
    
    static let shared = JSAPICaller()
    private let vm = JSVirtualMachine()
    private let context: JSContext
    
    private override init() {
        let jsCode = try? String.init(contentsOf: Bundle.main.url(
            forResource: "Sentimentalist.bundle",
            withExtension: "js")!
        )
        
        let nativeLog: @convention(block) (String) -> Void = { message in
            NSLog("JS Log: \(message)")
        }
        
        // Create a new JavaScript context that will contain the state of our evaluated JS code.
        self.context = JSContext(virtualMachine: self.vm)
        
        // Register our native logging function in the JS context
        self.context.setObject(nativeLog, forKeyedSubscript: "nativeLog" as NSString)
        
        // Evaluate the JS code that defines the functions to be used later on.
        self.context.evaluateScript(jsCode)
    }

    func callAPI(completion: @escaping (_ response: Any) -> Void) {
        // Run this asynchronously in the background
        DispatchQueue.global(qos: .userInitiated).async {
            var response: Any!
            let jsModule = self.context.objectForKeyedSubscript("Sentimentalist")
            let jsAnalyzer = jsModule?.objectForKeyedSubscript("Analyzer")
            
            if let result = jsAnalyzer?.objectForKeyedSubscript("callAPI").call(withArguments: nil) {
                response = result
            }
            
            // Call the completion block on the main thread
            DispatchQueue.main.async {
                completion(response)
            }
        }
    }
}
