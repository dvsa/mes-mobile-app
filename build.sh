ionic cordova build ios
xcodebuild \
    -workspace "platforms/ios/Mobile Examiner.xcworkspace" \
    -scheme "Mobile Examiner" \
    -archivePath "platforms/ios/Mobile Examiner.xcarchive" \
    CODE_SIGNING_REQUIRED=NO \
    CODE_SIGN_IDENTITY="" \
    clean archive
