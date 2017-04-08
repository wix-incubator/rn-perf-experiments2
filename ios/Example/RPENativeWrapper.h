//
//  RPENativeWrapper.h
//  Example
//
//  Created by Tal Kol on 08/04/2017.
//

#import <UIKit/UIKit.h>
@class RCTBridge;

@interface RPENativeWrapper : UIView<UIScrollViewDelegate>

- (instancetype)initWithBridge:(RCTBridge *)bridge NS_DESIGNATED_INITIALIZER;

@property (nonatomic, copy) NSNumber *scrollViewHandle;

@end
